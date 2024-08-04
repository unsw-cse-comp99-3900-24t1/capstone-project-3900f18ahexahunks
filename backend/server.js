require('dotenv').config();
const express = require('express');
const { connectDB } = require('./db');
const setupUBLValidationRoute = require('./routes/ublRoutes'); // Import the new route file

const app = express();
const PORT = process.env.PORT || 5003;

app.use(express.json());

connectDB().then(client => {
  const db = client.db();
  
  // Setup UBL validation route
  setupUBLValidationRoute(db); 
  app.use('/', setupUBLValidationRoute(db)); // Use the UBL validation route
  
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});

module.exports = { app };
