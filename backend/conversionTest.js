const axios = require('axios');
const fs = require('fs').promises;

async function convertPdfToUblLocally() {
    try {
        // Read the PDF file and convert it to base64
        const pdfFilePath = './src/testPDFs/Invoice_001.pdf'; // Adjust the path to your PDF file
        const fileBuffer = await fs.readFile(pdfFilePath);
        const base64FileData = fileBuffer.toString('base64');

        // Prepare the payload
        const payload = {
            base64FileData: base64FileData
        };

        // Send the request
        const response = await axios.post('http://localhost:5003/convert-pdf-to-ubl', payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Log the response
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

convertPdfToUblLocally();
