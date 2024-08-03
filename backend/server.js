const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./db');
const fileRoutes = require('./src/routes/fileRoutes');
const emailRoutes = require('./src/routes/emailRoutes');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', fileRoutes);
app.use('/api', emailRoutes);

// Connect to the database and start the server
connectDB()
  .then(() => {
    const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database', err);
  });