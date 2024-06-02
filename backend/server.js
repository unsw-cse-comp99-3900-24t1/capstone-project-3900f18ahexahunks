const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http');

const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;

const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('Server running on port:', PORT);
});
