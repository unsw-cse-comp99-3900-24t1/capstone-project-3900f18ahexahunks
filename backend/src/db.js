require('dotenv').config();
const { MongoClient } = require('mongodb');

const connectDB = async () => {
  try {
    const client = new MongoClient("mongodb+srv://ChengTong:e4Uu1ExS9L58jDIu@comp3900-hexahunks.db0uu6n.mongodb.net/?retryWrites=true&w=majority&appName=comp3900-HEXAHUNKS", {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
    });
    await client.connect();
    console.log('MongoDB connected');
    return client;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed');
  }
};

module.exports = connectDB;
