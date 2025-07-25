import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import razorpay from "razorpay"
import transactionModel from "../models/transactionModel.js";
import "dotenv/config"
import crypto from 'crypto';


const registerUser = async(req,res)=>{
    try{

        // extract these fields from request body 
        const {name,email,password} = req.body
        //check ki saari fields bhari bhi h ya nahi 
        if(!name || !email || !password){
            return res.json({success:false, message: "Missing Details"})
        }
        // this is use to add complexity of password 
        const salt = await bcrypt.genSalt(10);
        // this stores the complex password
        const hashedPassword = await bcrypt.hash(password,salt)
        // database me userData daalne ke liye name , email or hashed password store karenge 
        // db me actual password nahi daalenge 
        const userData = {
            name, email, password: hashedPassword
        }
        // newUser ( ye ek object hain userModel ka) me userData daal do 
        const newUser = new userModel(userData)
        // newUser ka data mongodb me save ho gya
        // user variable me mongodb ka response aaya 
        const user = await newUser.save();

        //generate a token 
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        // send this token in response 
        res.json({success:true,token,user:{name:user.name}})

    } catch (error){
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

const loginUser = async(req,res)=>{
    try{

        //extract email and password 
        const {email,password}=req.body;
        // check if email exists in database and store it in user
        const user = await userModel.findOne({email}) 
        // agar email doent exists means user is empty 
        if(!user){
            return res.json({success:false, message: "User does not exist"})
        }
        // if user exits now compare the password
        const isMatch = await bcrypt.compare(password, user.password)
        // if matched login succesfully else invalid credentials
        if(isMatch){
            //generate a token 
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            // send this token in response 
            res.json({success:true,token,user:{name:user.name}})
        } else {
            return res.json({success:false, message: "Invalid Credentials"})
        }


    } catch(error){
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

const userCredits = async (req, res) => {
    try {

        const { userId } = req.body
        const user = await userModel.findById(userId)
        res.json({ success: true, credits: user.creditBalance, user: { name: user.name } })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const paymentRazorpay = async (req, res) => {
    try {
        const { userId, planId } = req.body;
        const userData = await userModel.findById(userId);
        if (!userId || !planId) {
            return res.json({ success: false, message: "Missing Details" });
        }

        let credits, plan, amount;

        // Switch Cases for different plans
        switch (planId) {
            case 'Basic':
                plan = 'Basic';
                credits = 100;
                amount = 10;
                break;

            case 'Advanced':
                plan = 'Advanced';
                credits = 500;
                amount = 50;
                break;

            case 'Business':
                plan = 'Business';
                credits = 5000;
                amount = 250;
                break;

            default:
                return res.json({ success: false, message: 'Plan not found' });
        }

        // Declare the date variable
        const date = Date.now();

        // Creating Transaction Data
        const transactionData = {
            userId,
            plan,
            amount,
            credits,
            date,
        };

        // Saving Transaction Data to Database
        const newTransaction = await transactionModel.create(transactionData);

        // Creating options to create Razorpay Order
        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id,
        };

        // Creating Razorpay Order
        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error });
            }
            res.json({ success: true, order });
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (generatedSignature !== razorpay_signature) {
            return res.json({ success: false, message: 'Invalid payment signature' });
        }

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        
        if (orderInfo.status === 'paid') {
            const transactionData = await transactionModel.findById(orderInfo.receipt);
            if (!transactionData) {
                return res.json({ success: false, message: 'Transaction not found' });
            }

            if (transactionData.payment) {
                return res.json({ success: false, message: 'Payment already processed' });
            }

            
            const userData = await userModel.findById(transactionData.userId);
            if (!userData) {
                return res.json({ success: false, message: 'User not found' });
            }

            const creditBalance = userData.creditBalance + transactionData.credits;
            await userModel.findByIdAndUpdate(userData._id, { creditBalance });
            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });
            res.json({ success: true, message: "Credits added successfully", creditBalance });
        } else {
            res.json({ success: false, message: 'Payment failed' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



export {registerUser,loginUser,userCredits,paymentRazorpay,verifyRazorpay}