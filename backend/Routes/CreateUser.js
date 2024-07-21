const express = require("express");
const router = express.Router();
const User = require("../Model/user");

router.post("/createuser", async (req, res) => {
  try {
    const { name, password, email, location, phone, role } = req.body;

    if (!name || !password || !email || !location || !phone || !role) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    await User.create({
      name,
      password,
      email,
      location,
      phone,
      role
    });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
