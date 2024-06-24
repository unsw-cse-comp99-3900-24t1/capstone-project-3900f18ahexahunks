const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    } else {
      throw new Error('Database connection failed');
    }
  }
};

module.exports = connectDB;
