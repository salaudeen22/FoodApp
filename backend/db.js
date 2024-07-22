const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://salaudeensalu:9535443020@cluster0.kssfjtz.mongodb.net/GOFOODMERN?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
    const fetchdata=await mongoose.connection.db.collection("food_item");
    
    const foodItemCollection = mongoose.connection.db.collection("food_item");

    const fetchData = await foodItemCollection.find({}).toArray();

    const foodCategorycollection= mongoose.connection.db.collection("foodcategory");
    const foodCategory = await foodCategorycollection.find({}).toArray();

    if (fetchData === null) {
      console.log("Data is null");
    } else {
      global.food_item = fetchData;
      global.foodCategory=foodCategory;
    //   console.log(global.food_item);
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongoDB;