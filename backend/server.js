require('dotenv').config(); // Load .env file at the very top
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./db'); // Ensure this file is required to establish DB connection
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Initialize DB connection
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use('/', authRoutes);

const PORT = process.env.BACKEND_SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
