require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const cors = require('cors');
const authRoutes = require('../backend/routes/authRoutes');
const authSendOTP = require('../backend/routes/authSendOtp')
const fileRoutes = require('./routes/fileRoutes');
const http = require('http');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/', authRoutes);
app.use('/user', authSendOTP);
app.use('/', fileRoutes);

app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

const PORT = process.env.BACKEND_SERVER_PORT;
const server = http.createServer(app);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log('Server running on port:', PORT);
  });
});

module.exports = app;
