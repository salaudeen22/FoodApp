const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema({
  CategoryName: { type: String, required: true }, 
  name: { type: String, required: true },
  img: { type: String, required: true },
  options: [
    {
      half: { type: Number },
      full: { type: Number },
    },
  ],
  description: { type: String, required: true },
}, { collection: 'food_item' });

module.exports = mongoose.model("FoodItem", FoodItemSchema);
