import path from "path";
require("dotenv").config({ path: path.join(process.cwd(), ".env.local") });
require("dotenv").config({ path: path.join(process.cwd(), ".env") });
import { Request, Response } from "express";
import Razorpay from "razorpay";
import { uid } from "uid";

const payment = async (req: Request, res: Response) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const { amount } = req.body;
    const order = await razorpay.orders.create({
      payment_capture: "1",
      amount: parseInt(amount) * 100,
      currency: "INR",
      receipt: uid(10),
    });
    if (order) {
      res.status(200).json(Object.assign(order, { created_at: new Date() }));
    } else {
      throw new Error("Order not created");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export default payment;
