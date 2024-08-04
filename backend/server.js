require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./db');
const cors = require('cors');
const authRoutes = require('../backend/routes/authRoutes');
const authSendOTP = require('../backend/routes/authSendOtp')
const fileRoutes = require('./routes/fileRoutes');
const emailRoutes = require('./routes/emailRoutes');
const http = require('http');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', authRoutes);
app.use('/user', authSendOTP);
app.use('/', fileRoutes);
app.use('/', emailRoutes);

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
