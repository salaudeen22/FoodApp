const express = require("express");
const router = express.Router();
const User = require("../Model/user");
const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Company = require("../Model/Company");
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
    body("password", "Password should be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const email = req.body.email;
    const password = req.body.password;

    try {
    
      const user = await User.findOne({ email });
      if (user) {
     
        const pwdCompare = await bcryptjs.compare(password, user.password);
        if (!pwdCompare) {
          return res.status(400).json({ errors: "Incorrect password for user" });
        }
        const data = { user: { id: user.id } };
        const authtoken = jwt.sign(data, jwtsecret);
        return res.json({ success: true, authtoken, role: user.role });
      }

      const company = await Company.findOne({ email });
      if (company) {
      
        const pwdCompare = await bcryptjs.compare(password, company.password);
        if (!pwdCompare) {
          return res.status(400).json({ errors: "Incorrect password for company" });
        }
        const data = { company: { id: company.id } };
        const authtoken = jwt.sign(data, jwtsecret);
        return res.json({ success: true, authtoken, role: "vendor",name:company.name });
      }

      
      return res.status(400).json({ errors: "Invalid email or password" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
);

module.exports = router;
