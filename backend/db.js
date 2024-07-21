const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://salaudeensalu:9535443020@cluster0.kssfjtz.mongodb.net/GOFOODMERN?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
    const fetchdata=await mongoose.connection.db.collection("food_item");
    fetchdata.find({}).toArray(function(err,data)
    {
      if(err)console.log(err);
      else
      {
        console.log(data);
      }
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongoDB;