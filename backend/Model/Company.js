const mongoose = require("mongoose");
const FoodItemSchema = require("./FoodItem").schema;

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String, required: true },
  password: { type: String, required: true },
  description: { type: String },
  cuisines: { type: String },
  openingHours: { type: String },
  foodItems: [FoodItemSchema],
});

module.exports = mongoose.model("Company", CompanySchema);
