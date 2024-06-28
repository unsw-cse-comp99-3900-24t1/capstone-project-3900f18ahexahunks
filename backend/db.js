require('dotenv').config();
const { MongoClient } = require('mongodb');

const connectDB = async () => {
    try {
        const client = new MongoClient(process.env.MONGO_URI, {
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
