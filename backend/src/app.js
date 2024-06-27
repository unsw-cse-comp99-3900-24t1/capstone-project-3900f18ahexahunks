const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const userRoutes = require('./routes/userRoutes');
const validationRoutes = require('./routes/validationRoutes');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.json());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/invoice', invoiceRoutes);
app.use('/api/pdf', pdfRoutes);
app.use('/api/user', userRoutes);
app.use('/api/validation', validationRoutes);

module.exports = app;
