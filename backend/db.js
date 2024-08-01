const { MongoClient } = require('mongodb');
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('MongoDB connected');
    return client;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('MongoDB connection error');
  }
};

module.exports = connectDB;
