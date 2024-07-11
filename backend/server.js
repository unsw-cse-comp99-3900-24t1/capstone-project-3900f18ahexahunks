const express = require('express');
const cors = require('cors');
const { handleFileUpload, validateUBLFile, rerunValidation, getValidationReport } = require('./fileHandler');
const { connectDB } = require('./utils');

const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.post('/upload', handleFileUpload);
app.post('/validate-ubl', validateUBLFile);
app.put('/rerun-validation', rerunValidation);
app.get('/validation-report/:type/:id', getValidationReport);

const server = app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on port: ${PORT}`);
});

module.exports = app;
