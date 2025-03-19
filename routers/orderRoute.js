import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

import {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";

const orderRoute = express.Router();

// Admin Features
orderRoute.post("/list", adminAuth, allOrders);
orderRoute.post("/status", adminAuth, updateStatus);

// Payment Features
orderRoute.post("/place", authUser, placeOrder);
orderRoute.post("/razorpay", authUser, placeOrderRazorpay);
orderRoute.post("/stripe", authUser, placeOrderStripe);

// User Feature
orderRoute.post("/userorders", authUser, userOrders);

export default orderRoute;