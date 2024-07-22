const express = require("express");
const router = express.Router();
const Company = require("../Model/Company");
const bcrypt = require("bcrypt");

router.post("/addCompany", async (req, res) => {
  try {
    const {
      name,
      address,
      phone,
      email,
      website,
      description,
      cuisines,
      openingHours,
      foodItems,
      password,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompany = new Company({
      name,
      address,
      phone,
      email,
      website,
      description,
      cuisines,
      openingHours,
      foodItems,
      password: hashedPassword,
    });

    await newCompany.save();

    res
      .status(201)
      .json({ message: "Company added successfully!", company: newCompany });
  } catch (error) {
    console.error("Error adding company:", error);
    res.status(500).json({ error: "Failed to add company" });
  }
});

router.put("/updateCompany/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      address,
      phone,
      email,
      website,
      description,
      cuisines,
      openingHours,
      foodItems,
    } = req.body;

    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      {
        name,
        address,
        phone,
        email,
        website,
        description,
        cuisines,
        openingHours,
        foodItems,
      },
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.status(200).json({
      message: "Company updated successfully!",
      company: updatedCompany,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({ error: "Failed to update company" });
  }
});

router.delete("/deleteCompany/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCompany = await Company.findByIdAndDelete(id);

    if (!deletedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.status(200).json({
      message: "Company deleted successfully!",
      company: deletedCompany,
    });
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({ error: "Failed to delete company" });
  }
});

module.exports = router;
