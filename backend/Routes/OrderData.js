const express = require("express");
const router = express.Router();
const Order = require("../Model/Order");

router.post("/orderData", async (req, res) => {
  try {
    const { email, phone, order_data } = req.body;
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
