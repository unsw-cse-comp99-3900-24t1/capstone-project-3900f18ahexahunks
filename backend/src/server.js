const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const connectDB = require('./db');
const { adminAuthLogin, adminAuthRegister } = require('./src/authentication');
const { MongoClient } = require('mongodb');

const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
let isServerBusy = false; // Simulating server busy state

app.use(express.json());
app.use(cors());

app.get('/test', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Define the login route
app.post('/login', (req, res) => {
  if (isServerBusy) {
    return res.status(500).json({ error: "Please try again later" });
  }

  const { email, password } = req.body;
  const response = adminAuthLogin(email, password);

  if ('error' in response) {
    if (response.error === "Invalid Email or password") {
      res.status(400);
    } else if (response.error === "Please try again later") {
      res.status(500);
    }
  } else {
    res.status(200);
  }

  return res.json(response);
});

// Define the register route
app.post('/register', (req, res) => {
  if (isServerBusy) {
    return res.status(500).json({ error: "Please try again later" });
  }

  const { email, password, passwordCheck } = req.body;
  const response = adminAuthRegister(email, password, passwordCheck);

  if ('error' in response) {
    if (response.error === "Invalid Email or password") {
      res.status(400);
    } else if (response.error === "Please try again later") {
      res.status(500);
    } else if (response.error === "Passwords do not match") {
      res.status(402);
    }
  } else {
    res.status(200);
  }

  return res.json(response);
});

// Define the data route
app.get('/data', async (req, res, next) => {
  if (isServerBusy) {
    return res.status(500).json({ error: "Please try again later" });
  }

  const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('mydatabase');
    const collection = database.collection('mycollection');

    // Simulate an operation that could fail
    const result = await collection.findOne({ _id: 'nonexistentId' });

    if (!result) {
      throw new Error('Document not found');
    }

    res.json(result);
  } catch (error) {
    next(error);
  } finally {
    await client.close();
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error, please try again later' });
});

const server = http.createServer(app);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log('Server running on port:', PORT);
  });
});

module.exports = app;
