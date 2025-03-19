import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing orders using COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(200).json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Placing orders using Stripe method
const placeOrderStripe = async (req, res) => {};

// Placing orders using Razorpay method
const placeOrderRazorpay = async (req, res) => {};

// List all orders data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// List all orders for user frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const orders = await orderModel.find({ userId });

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No order found" });
    }

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Update order status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res
        .status(400)
        .json({ success: false, message: "Missing orderId or status" });
    }

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log("Update Order Status Error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
};
