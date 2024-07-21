const express = require("express");
const router = express.Router();
const User = require("../Model/user");
const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret="salaudeenisnextceoofgoogle "

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

      const salt = await bcryptjs.genSalt(10);
      let securepassword = await bcryptjs.hash(req.body.password, salt);

      await User.create({
        name,
        password: securepassword,
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
      const pwdCompare = bcryptjs.compare(req.body.password, userdata.password);

      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }
      const data = { user: { id: userdata.id } };

      const authtoken=jwt.sign(data,jwtsecret);


      res.json({ success: true,authtoken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }

     
  }
);

module.exports = router;
