# Imagify - AI Image Generator 🎨

**Live Demo**: 🚀 [https://imagify-gray-seven.vercel.app/](https://imagify-gray-seven.vercel.app/)

Imagify is a full-stack web application that allows users to generate unique images from text descriptions using the ClipDrop AI. It features a user-friendly interface built with **React** and a robust backend powered by **Node.js** and **Express**. The application includes user authentication, a credit system for image generation, and a payment gateway integrated with **Razorpay**.

## ✨ Features

  * **Text-to-Image Generation**: Convert textual descriptions into high-quality images.
  * **User Authentication**: Secure user registration and login system using JWT.
  * **Credit System**: Users have a credit balance that is consumed for each image generation.
  * **Payment Integration**: Purchase credits through a seamless payment process with Razorpay.
  * **Responsive Design**: A modern and responsive UI built with Tailwind CSS.
  * **API Integration**: Leverages the ClipDrop API for AI-powered image generation.

-----

## 🛠️ Technologies Used

### Frontend

  * **React**: A JavaScript library for building user interfaces.
  * **Vite**: A fast build tool for modern web development.
  * **React Router**: For client-side routing.
  * **Axios**: For making HTTP requests to the backend.
  * **Tailwind CSS**: A utility-first CSS framework for styling.
  * **Framer Motion**: For animations and transitions.
  * **React Toastify**: For displaying notifications.

### Backend

  * **Node.js**: A JavaScript runtime for server-side development.
  * **Express**: A web application framework for Node.js.
  * **MongoDB**: A NoSQL database for storing user and transaction data.
  * **Mongoose**: An ODM library for MongoDB and Node.js.
  * **JWT (JSON Web Tokens)**: For secure user authentication.
  * **Razorpay**: For processing payments.
  * **Axios**: For making requests to the ClipDrop API.
  * **ClipDrop API**: For AI image generation.

-----

## ⚙️ Installation and Setup

### Prerequisites

  * Node.js and npm
  * MongoDB instance (local or remote)
  * ClipDrop API Key
  * Razorpay API Key and Secret

### 1\. Clone the repository

```bash
git clone https://github.com/rupeshmerotha/imagify.git
cd imagify
```

### 2\. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add the following environment variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIPDROP_API=your_clipdrop_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR
```

### 3\. Setup the Frontend

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory and add the following environment variables:

```env
VITE_BACKEND_URL=http://localhost:3000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 4\. Run the application

  * **Start the backend server**:

<!-- end list -->

```bash
cd ../server
npm start
```

  * **Start the frontend development server**:

<!-- end list -->

```bash
cd ../client
npm run dev
```

-----

## 💳 Payment Instructions

When you proceed to payment, please use the **Card** option in Razorpay and enter the following details:

  * **Card Number**: `5267 3181 8797 5449`
  * **CVV**: Any 3-digit random number
  * **Expiry Date**: Any future date

-----

## 🔌 API Endpoints

### User Routes

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/user/register` | Register a new user. |
| `POST` | `/api/user/login` | Log in an existing user. |
| `GET` | `/api/user/credits` | Get the user's credit balance. |
| `POST` | `/api/user/pay-razor` | Initiate a Razorpay payment. |
| `POST`| `/api/user/verify-razor`| Verify a Razorpay payment. |

### Image Routes

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/image/generate-image` | Generate an image from a text prompt. |

-----

## 📁 Project Structure

```
imagify/
├── client/
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── ...
│ ├── .env
│ ├── package.json
│ └── ...
└── server/
  ├── config/
  ├── controllers/
  ├── middleware/
  ├── models/
  ├── routes/
  ├── .env
  ├── package.json
  └── server.js
```

-----

## 🚀 Deployment

The application is configured for deployment on Vercel. Both the `client` and `server` directories contain a `vercel.json` file for deployment settings.

-----

## 👤 Author

**Rupesh Merotha**

-----
