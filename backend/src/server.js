require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const connectDB = require('../db');
const { postRegister } = require('./postRegister');

const PORT = process.env.BACKEND_SERVER_PORT;

const app = express();

const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use(cors());

app.route('/').get((req, res) => {
  res.send('HI');
});

app.use('/', authRoutes);

// Create an HTTP server using the Express app
const server = http.createServer(app);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;
