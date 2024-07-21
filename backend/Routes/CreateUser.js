const express = require("express");
const router = express.Router();
const User = require("../Model/user");
const { body, validationResult } = require("express-validator");

router.post(
  "/createuser",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("name")
      .isLength({ min: 5 })
      .withMessage("Name must be at least 5 characters long"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
    body("location").notEmpty().withMessage("Location is required"),
    body("role")
      .isIn(["customer", "admin"])
      .withMessage("Role must be either 'customer' or 'admin'"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, password, email,phone, location, role } = req.body;

      

      await User.create({
        name,
        password,
        email,
        location,
        phone,
        role,
      });

      res.json({ success: true, message: "User created successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error." });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const email = req.body.email;

    try {
      const userdata = await User.findOne({ email });
      if (!userdata) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }

      if (req.body.password !== userdata.password) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }

      res.json({ success: true ,
        message: "Login successful.",
        role: userdata.role 
      });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
