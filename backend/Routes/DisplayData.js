const express = require("express");
const router = express.Router();


router.post("/foodData",(req,res)=>
{
    try
    {
        console.log(global.food_item);
        res.send([global.food_item]);

    }
    catch(error)
    {
        console.error(error.message);
        res.send("server error")

    }
});


module.exports = router;