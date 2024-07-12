const express = require('express');
const router = express.Router();
const connectDB = require('../../db');

// Example user route
router.get('/', async (req, res) => {
    let client;
    try {
      client = await connectDB();
      const db = client.db();
      const users = await db.collection('users').find().toArray();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch users' });
    } finally {
      if (client) {
        await client.close();
      }
    }
});
  
module.exports = router;
  