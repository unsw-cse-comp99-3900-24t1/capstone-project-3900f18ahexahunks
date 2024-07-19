const { MongoClient, GridFSBucket } = require('mongodb');
require('dotenv').config();

let db;
let gfs;

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI);

    await client.connect();
    db = client.db();
    gfs = new GridFSBucket(db, { bucketName: 'uploads' });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

const getDb = () => db;
const getGfs = () => gfs;

module.exports = { connectDB, getDb, getGfs };
