const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyEmail: { type: String, required: true },
  
}, { collection: 'foodcategory' });

module.exports = mongoose.model("foodcategory", CategorySchema);
