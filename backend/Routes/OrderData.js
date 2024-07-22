const express = require("express");
const router = express.Router();
const Order = require("../Model/Order.js");

router.post("/orderData", async (req, res) => {
  try {
    let data = req.body.order_data;

    if (!Array.isArray(data)) {
      data = [];
    }

    data.splice(0, 0, { order_data: req.body.order_data });

    let eID = await Order.findOne({ email: req.body.email });
    console.log(eID);

    if (!eID) {
      await Order.create({
        email: req.body.email,
        phone: req.body.phone,
        order_data: [data],
      });
    } else {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { phone: req.body.phone },
        { $push: { order_data: data } }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error: " + error.message);
  }
});

module.exports = router;
