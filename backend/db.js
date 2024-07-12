require('dotenv').config();
const { MongoClient } = require('mongodb');

// This code defines an asynchronous function connectDB for connecting to the MongoDB database 
// and returns the database client after a successful connection.

const connectDB = async () => {
    try {
        const client = new MongoClient(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
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
