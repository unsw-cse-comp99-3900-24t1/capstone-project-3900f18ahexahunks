require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const authRoutes = require('../backend/routes/authRoutes');
const authSendOTP = require('../backend/routes/authSendOtp');
const http = require('http');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000/',
    credentials: true,
  })
);
app.use(cookieParser());

app.use('/', authRoutes);
app.use('/user', authSendOTP);

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

module.exports = { app, server };
