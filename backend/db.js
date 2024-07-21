const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://salaudeensalu:9535443020@cluster0.kssfjtz.mongodb.net/GOFOODMERN?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongoDB;