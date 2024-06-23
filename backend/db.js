const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

// Initialize GridFS
let gfs;
mongoose.connection.once('open', () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads');
});

module.exports = {connectDB, gfs};
