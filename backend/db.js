const { MongoClient, GridFSBucket } = require('mongodb');
require('dotenv').config();

let db;
let gfs;

const connectDB = async () => {
  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    await client.connect();
    db = client.db();
    gfs = new GridFSBucket(db, {
      bucketName: 'uploads'
    });
    console.log('Connected to database');
  } catch (error) {
    console.error('Failed to connect to database', error);
  }
};

const getDb = () => db;
const getGfs = () => gfs;

module.exports = { connectDB, getDb, getGfs };
