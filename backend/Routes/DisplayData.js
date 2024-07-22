const express = require("express");
const router = express.Router();
const Company=require("../Model/Company")


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

module.exports = router;