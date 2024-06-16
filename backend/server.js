import { deleteUbl } from './ubl';

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

app.delete('/delete-ubl', (req, res) => {
  const { "UBL-id": ublId, "PDF-id": pdfId } = req.body;
  const response = deleteUbl(ublId, pdfId);
  res.status(response.status).json(response.json);
});
