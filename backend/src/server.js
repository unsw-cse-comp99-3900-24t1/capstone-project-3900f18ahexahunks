const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http');

const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;

const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

// add more in mongoDB or other functions
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourDatabaseName';

const { adminAuthLogin, adminAuthRegister } = require('./src/authentication');

// Define the login route
app.post('/login', (req, res) => {
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

server.listen(PORT, () => {
  console.log('Server running on port:', PORT);
});
