const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const connectDB = require('../db'); // Correct path to db
const { adminAuthLogin, adminAuthRegister, resetPassword } = require('./authentication'); // Correct path to authentication
const userRoutes = require('./routes/userRoutes'); // Correct path to userRoutes

const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/test', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const response = await adminAuthLogin(email, password);
  
    if (response.error) {
      const status = response.error === "Invalid Email or password" ? 400 : 500;
      return res.status(status).json(response);
    }
  
    return res.status(200).json(response);
  });
  
app.post('/register', async (req, res) => {
    const { userName, email, password, passwordCheck } = req.body;
    const response = await adminAuthRegister(userName, email, password, passwordCheck);
  
    if (response.error) {
      let status;
      switch (response.error) {
        case "Passwords do not match":
          status = 402;
          break;
        case "Invalid Email or password":
          status = 400;
          break;
        default:
          status = 500;
      }
      return res.status(status).json(response);
    }
  
    return res.status(200).json(response);
});

app.post('/user/update-password', async (req, res) => {
  const { emailOrUsername, currentPassword, newPassword } = req.body;
  const response = await resetPassword(emailOrUsername, currentPassword, newPassword);

  if (response.error) {
    let status;
    switch (response.error) {
      case "User not found":
        status = 401;
        break;
      case "Incorrect current password":
        status = 401;
        break;
      default:
        status = 500;
    }
    return res.status(status).json(response);
  }

  return res.status(200).json(response);
});

app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
