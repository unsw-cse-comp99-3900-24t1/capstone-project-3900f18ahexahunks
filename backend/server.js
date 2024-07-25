const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { validateUBLFileHandler } = require('./fileHandler');
const { connectDB } = require('./db');
const http = require('http');

require('dotenv').config();

const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const server = http.createServer(app);

connectDB();

app.post('/validate-ubl', validateUBLFileHandler);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
