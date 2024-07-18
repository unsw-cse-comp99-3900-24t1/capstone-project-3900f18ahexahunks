const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;
console.log('Attempting to connect to MongoDB:', mongoURI);

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("DB connected");
  } catch (error) {
    console.error('DB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
