const mongoose = require('mongoose');
const { expect } = require('chai');

const BACKEND_SERVER_PORT = "5003";
const DB_PASS = "e4Uu1ExS9L58jDIu";
const DB_USERNAME = "ChengTong";
const MONGO_URI = "mongodb+srv://ChengTong:e4Uu1ExS9L58jDIu@comp3900-hexahunks.db0uu6n.mongodb.net/?retryWrites=true&w=majority&appName=comp3900-HEXAHUNKS";

describe('MongoDB Connection Test', () => {
  before(async () => {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
      throw err;
    }
  });

  it('should connect to MongoDB successfully', () => {
    expect(mongoose.connection.readyState).to.equal(1); // 1 means connected
  });

  after(async () => {
    await mongoose.disconnect();
  });
});
