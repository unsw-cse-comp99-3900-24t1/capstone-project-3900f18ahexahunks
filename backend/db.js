const mongoose = require('mongoose');
const { MongoClient, GridFSBucket } = require('mongodb');
const { Readable } = require("stream");
require('dotenv').config();

let db;
let gfs;

const mongoURI = process.env.MONGO_URI;
console.log('Attempting to connect to MongoDB:', mongoURI);

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Mongoose connected");
		const client = await MongoClient.connect(mongoURI);
		db = client.db();
    gfs = new GridFSBucket(db, { bucketName: 'uploads' });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('DB connection error:', error);
    process.exit(1);
  }
};

const getDb = () => db;
const getGfs = () => gfs;

const saveToMongo = (
  data,
  filename,
  metadata,
  contentType = "application/xml"
) => {
  try {
    const gfs = getGfs();
    const stream = Readable.from(data);
    const upload = gfs.openUploadStream(filename, {
      metadata,
      contentType: contentType,
    });
    return new Promise((resolve, reject) => {
      stream
        .pipe(upload)
        .on("error", (err) => {
          reject(err);
        })
        .on("finish", () => {
          resolve(upload.id);
        });
    });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { connectDB, getDb, getGfs, saveToMongo };