const express = require('express');
const connectDB = require('../db'); // Ensure this is correct
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json()); // Correct placement for parsing JSON request body
app.use('/', authRoutes);

const PORT = process.env.BACKEND_SERVER_PORT || 5003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
