const express = require('express');
const cors = require('cors');
const { handleFileUpload, handleFileUploadHandler, validateUBLFile, validateUBLFileHandler, rerunValidation, getValidationReport } = require('./fileHandler');
const { connectDB } = require('./utils');

const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.post('/upload', handleFileUpload, handleFileUploadHandler);
app.post('/validate-ubl', validateUBLFile, validateUBLFileHandler);
app.put('/rerun-validation', rerunValidation);
app.get('/validation-report/:type/:id', getValidationReport);

const server = app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on port: ${PORT}`);
});

module.exports = app;


// frontend code client.js
// $.post('/validate-ubl', { file: yourFile }, function(data) {
//   const validationResults = data.validationResults;
//   const pdfBuffer = data.pdfBuffer;

//   // Convert base64 string back to binary
//   const byteCharacters = atob(pdfBuffer);
//   const byteNumbers = new Array(byteCharacters.length);
//   for (let i = 0; i < byteCharacters.length; i++) {
//       byteNumbers[i] = byteCharacters.charCodeAt(i);
//   }
//   const byteArray = new Uint8Array(byteNumbers);

//   // Create a blob from the binary data
//   const blob = new Blob([byteArray], { type: 'application/pdf' });

//   // Create a link element
//   const link = document.createElement('a');
//   link.href = URL.createObjectURL(blob);
//   link.download = 'Validation_Report.pdf';

//   // Append the link to the body
//   document.body.appendChild(link);

//   // Programmatically trigger the click event
//   link.click();

//   // Remove the link from the document
//   document.body.removeChild(link);

//   console.log(validationResults);
// });
