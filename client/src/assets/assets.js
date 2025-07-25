import logo from "./logo.svg";
import logo_icon from "./logo_icon.svg";
import facebook_icon from "./facebook_icon.svg";
import instagram_icon from "./instagram_icon.svg";
import twitter_icon from "./twitter_icon.svg";
import star_icon from "./star_icon.svg";
import rating_star from "./rating_star.svg";
import sample_img_1 from "./sample_img_1.png";
import sample_img_2 from "./sample_img_2.png";
import profile_img_1 from "./profile_img_1.png";
import profile_img_2 from "./profile_img_2.png";
import step_icon_1 from "./step_icon_1.svg";
import step_icon_2 from "./step_icon_2.svg";
import step_icon_3 from "./step_icon_3.svg";
import email_icon from "./email_icon.svg";
import lock_icon from "./lock_icon.svg";
import cross_icon from "./cross_icon.svg";
import star_group from "./star_group.png";
import credit_star from "./credit_star.svg";
import profile_icon from "./profile_icon.png";
import razorpay_logo from "./razorpay_logo.png";
import person_icon from "./person_icon.svg";

export const assets = {
  logo,
  logo_icon,
  facebook_icon,
  instagram_icon,
  twitter_icon,
  star_icon,
  rating_star,
  sample_img_1,
  sample_img_2,
  email_icon,
  lock_icon,
  cross_icon,
  star_group,
  credit_star,
  profile_icon,
  razorpay_logo,
  person_icon,
};

export const stepsData = [
  {
    title: "Describe Your Vision",
    description:
      "Type a phrase, sentence, or paragraph that describes the image you want to create.",
    icon: step_icon_1,
  },
  {
    title: "Watch the Magic",
    description:
      "Our AI-powered engine will transform your text into a high-quality, unique image in seconds.",
    icon: step_icon_2,
  },
  {
    title: "Download & Share",
    description:
      "Instantly download your creation or share it with the world directly from our platform.",
    icon: step_icon_3,
  },
];

export const testimonialsData = [
  {
    image: profile_img_1,
    name: "Aman Sharma",
    role: "Social Media Manager",
    stars: 5,
    text: `Imagify has completely changed the way I design creatives for Instagram. The text-to-image results are not just fast but also visually stunning!`,
  },
  {
    image: profile_img_2,
    name: "Rohit Mehta",
    role: "Startup Founder",
    stars: 5,
    text: `As a founder with no design background, Imagify helps me generate pitch deck visuals and ad creatives instantly. Total game-changer!`,
  },
  {
    image: profile_img_1,
    name: "Suraj Gupta",
    role: "Freelance Illustrator",
    stars: 5,
    text: `From concept sketches to poster ideas, Imagify has become an essential tool in my creative workflow. Proud that it's made in India!`,
  },
];

export const plans = [
  {
    id: "Basic",
    price: 10,
    credits: 100,
    desc: "Best for personal use.",
  },
  {
    id: "Advanced",
    price: 50,
    credits: 500,
    desc: "Best for business use.",
  },
  {
    id: "Business",
    price: 250,
    credits: 5000,
    desc: "Best for enterprise use.",
  },
];
