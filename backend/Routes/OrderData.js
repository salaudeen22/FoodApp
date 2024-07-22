const express = require("express");
const router = express.Router();
const Order = require("../Model/Order");
const User = require("../Model/user"); 

router.post("/orderData", async (req, res) => {
  try {
    const { email, order_data } = req.body;

    if (!email || !order_data) {
      return res.status(400).json({ success: false, message: "Email and order data are required" });
    }

   
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const phone = user.phone;
    const existingOrder = await Order.findOne({ email });

    const orderDetails = { order_data };

    if (!existingOrder) {

      const newOrder = new Order({
        email,
        phone,
        order_data: [orderDetails]
      });
      await newOrder.save();
      res.json({ success: true });
    } else {
    
      existingOrder.order_data.push(orderDetails);
      await existingOrder.save();
      res.json({ success: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/myorderdata", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const myData = await Order.findOne({ email });

    if (myData) {
      res.json({ order_data: myData });
    } else {
      res.status(404).json({ success: false, message: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
