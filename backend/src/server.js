const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { adminAuthLogin, adminAuthRegister } = require('./authentication');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./db');

const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;

const app = express();

let isServerBusy = false;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cors());

app.get('/test', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.post('/login', async (req, res) => {
  if (isServerBusy) {
      return res.status(500).json({ error: "Please try again later" });
  }

  const { email, password } = req.body;
  const response = await adminAuthLogin(email, password);

  if (response.error) {
      if (response.error === "Invalid Email or password") {
          return res.status(400).json(response);
      } else {
          return res.status(500).json(response);
      }
  }

  return res.status(200).json(response);
});

app.post('/register', async (req, res) => {
  if (isServerBusy) {
      return res.status(500).json({ error: "Please try again later" });
  }

  const { userName, email, password, passwordCheck } = req.body;
  const response = await adminAuthRegister(email, password, passwordCheck);

  if (response.error) {
      let status;
      if (response.error === "Passwords do not match") {
          status = 402;
      } else if (response.error === "Email already registered") {
          status = 400;
      } else {
          status = 500;
      }
      return res.status(status).json(response);
  }

  return res.status(200).json(response);
});

// Use user routes
app.use('/users', userRoutes);

const server = app.listen(PORT, () => {
    console.log('Server running on port:', PORT);
});

module.exports = { app, server };
