const express = require("express");
const router = express.Router();
const Company=require("../Model/Company");
const Category = require("../Model/Category");


router.post("/foodData",(req,res)=>
{
    try
    {
        res.send([global.food_item,global.foodCategory]);

    }
    catch(error)
    {
        console.error(error.message);
        res.send("server error")

    }
});

router.get('/allCompanies', async (req, res) => {
    try {
      const companies = await Company.find();
      res.status(200).json(companies);
    } catch (error) {
      console.error('Error fetching companies:', error);
      res.status(500).json({ error: 'Failed to fetch companies' });
    }
  });

  
  router.get('/allCategories', async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 }); 
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

module.exports = router;