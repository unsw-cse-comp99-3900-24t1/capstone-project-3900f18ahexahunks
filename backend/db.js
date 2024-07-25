const { MongoClient, GridFSBucket } = require('mongodb');
require('dotenv').config();

let db;

const connectDB = async () => {
  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  db = client.db();
  console.log('Connected to database');
};

const getDb = () => db;
const getBucket = () => new GridFSBucket(db, { bucketName: 'uploads' });

module.exports = { connectDB, getDb, getBucket };
