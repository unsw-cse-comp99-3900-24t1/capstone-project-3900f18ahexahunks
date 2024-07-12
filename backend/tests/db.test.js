const connectDB = require('../db');
const { MongoClient } = require('mongodb');

// This code is a test script to verify that MongoDB connection is working properly.

describe('MongoDB Connection', () => {
  let client;

  beforeAll(async () => {
    client = await connectDB();
  });

  afterAll(async () => {
    await client.close();
  });

  it('should connect to the database', async () => {
    expect(client.topology.isConnected()).toBe(true);
  });
});

