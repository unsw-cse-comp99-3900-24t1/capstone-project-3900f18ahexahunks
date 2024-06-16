const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');

const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;

const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');

    // Optionally, you can add a ping or a simple query to ensure the connection is working
    return mongoose.connection.db.admin().ping();
  })
  .then((result) => {
    console.log('Ping result:', result);

    server.listen(PORT, () => {
      console.log('Server running on port:', PORT);
    });
  })
  .catch((err) => {
    console.log('Database connection failed with error:', err);
  });
