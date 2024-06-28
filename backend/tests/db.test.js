const connectDB = require('../db');
const { MongoClient } = require('mongodb');

describe('MongoDB Connection', () => {
  let client;

  beforeAll(async () => {
    client = await connectDB();
  });

  afterAll(async () => {
    if (client) {
      await client.close();
    }
  });

  it('should connect to the database', async () => {
    const adminDb = client.db().admin();
    const result = await adminDb.ping();
    expect(result).toEqual({ ok: 1 });
  });
});
