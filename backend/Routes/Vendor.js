const express = require("express");
const router = express.Router();
const Category = require("../Model/Category");


const FoodItem = require("../Model/FoodItem");
const Company=require("../Model/Company");

router.post("/addCategory", async (req, res) => {
  try {
    const { name, companyEmail } = req.body;
    const newCategory = new Category({ name, companyEmail });
    await newCategory.save();
    res
      .status(201)
      .json({ message: "Category added successfully!", category: newCategory });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: "Failed to add category" });
  }
});

router.post("/addFoodItem", async (req, res) => {
  const { name, img, options, description, category, companyEmail } = req.body;

  try {
    const company = await Company.findOne({ email: companyEmail });
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

  
    // const categoryExists = await Category.findById(category);
    // if (!categoryExists) return res.status(404).json({ error: "Category not found" });

    const newFoodItem = new FoodItem({
      category: category,
      name,
      img,
      options,
      description,
    });

    company.foodItems.push(newFoodItem);
    await company.save();
    await newFoodItem.save();

    res.status(201).json({
      message: "Food item added successfully!",
      foodItem: newFoodItem,
    });
  } catch (error) {
    console.error("Error adding food item:", error);
    res.status(500).json({ error: "Failed to add food item" });
  }
});


module.exports = router;
