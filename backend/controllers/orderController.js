import dotenv from 'dotenv';
dotenv.config(); // Load environment variables first

import Razorpay from "razorpay";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});



const placeOrder = async (req, res) => {
  const frontend_url = "https://tomato-a-food-delivery-app-1.onrender.com";

  try {
    const items = req.body.items;

    // Total price calculation
    let totalAmount = 0;

    items.forEach((item) => {
      totalAmount += item.price * item.quantity * 100 * 80; // paise
    });

    // Add delivery charges: ₹2 * 100 * 80 (based on your logic)
    const deliveryCharge = 2 * 100 * 80;
    totalAmount += deliveryCharge;

    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: totalAmount / 100, // storing in ₹, not paise
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Create Razorpay order
    const options = {
      amount: totalAmount, // in paise
      currency: "INR",
      receipt: `order_rcptid_${newOrder._id}`,
      payment_capture: 1,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      success: true,
      order: razorpayOrder,
      orderId: newOrder._id,
      items: newOrder.items,
      frontendRedirect: {
        success: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Payment creation failed" });
  }
};

const verifyOrder = async(req,res) =>{
  const {orderId,success} = req.body;
  try {
    if(success == "true"){
      await orderModel.findByIdAndUpdate(orderId, {payment:true});
      res.json({success:true,message:"Payment successful"});
    }
    else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({success:false,message:"Payment failed"});
    }
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Payment verification failed"});
  }
}

//user order for frontend
const userOrders = async(req,res) => {
  try {
    const orders = await orderModel.find({userId:req.body.userId});
    res.json({success:true,data:orders});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Failed to fetch user orders"});
  }
}

//listing orders for admin panel
const listOrders = async(req,res) => {
  try {
    const orders = await orderModel.find({});
    res.json({success:true,data:orders});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

// api for updating order status

const updateStatus = async(req,res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({success:true,message:"Status Updated"});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}
export { placeOrder,verifyOrder,userOrders,listOrders,updateStatus };
