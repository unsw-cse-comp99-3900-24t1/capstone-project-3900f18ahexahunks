require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use('/', authRoutes);

app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

const PORT = process.env.BACKEND_SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
