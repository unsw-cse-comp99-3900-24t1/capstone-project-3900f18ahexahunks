const { MongoClient, GridFSBucket } = require('mongodb');
require('dotenv').config();

let db, bucket;

const connectDB = async () => {
    const client = new MongoClient(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();
    db = client.db(process.env.DB_NAME);
    bucket = new GridFSBucket(db, {
        bucketName: 'uploads',
    });

    console.log('MongoDB connected');
};

const getDb = () => db;
const getBucket = () => bucket;

module.exports = { connectDB, getDb, getBucket };
