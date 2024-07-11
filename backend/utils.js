const { MongoClient, GridFSBucket } = require('mongodb');
require('dotenv').config();

let db, bucket, client;

const connectDB = async () => {
    if (client && client.topology && client.topology.isConnected()) {
        return client;
    }

    client = new MongoClient(process.env.MONGO_URI, {
        // Remove the deprecated options
    });

    await client.connect();
    db = client.db(process.env.DB_NAME);
    bucket = new GridFSBucket(db, {
        bucketName: 'uploads',
    });

    console.log('MongoDB connected');
    return client;
};

const getDb = () => db;
const getBucket = () => bucket;

module.exports = { connectDB, getDb, getBucket };
