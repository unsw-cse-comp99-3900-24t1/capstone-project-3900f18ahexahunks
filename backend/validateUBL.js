require('dotenv').config();

const axios = require('axios');
const fs = require('fs');
const crypto = require('crypto');
const qs = require('qs');
const PDFDocument = require('pdfkit');
const path = require('path');

console.log('TOKEN_ENDPOINT:', process.env.TOKEN_ENDPOINT);
console.log('CLIENT_ID:', process.env.CLIENT_ID);
console.log('CLIENT_SECRET:', process.env.CLIENT_SECRET);

const getAuthToken = async () => {
  try {
    const params = qs.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      scope: 'eat/read',
    });

    const response = await axios.post(process.env.TOKEN_ENDPOINT, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Auth token response:', response.data);
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting auth token:', error.response ? error.response.data : error.message);
    if (error.response) {
      console.error('Status Code:', error.response.status);
      console.error('Headers:', error.response.headers);
      console.error('Data:', error.response.data);
    }
    return null;
  }
};

const validateUBL = async (filePath) => {
  const token = await getAuthToken();
  if (!token) {
    console.log('Failed to get auth token.');
    return;
  }

  const fileName = path.basename(filePath);
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const encodedContent = Buffer.from(fileContent).toString('base64');
  const checksum = crypto.createHash('md5').update(encodedContent).digest('hex');

  const payload = {
    filename: fileName,
    content: encodedContent,
    checksum: checksum,
  };

  try {
    const response = await axios.post(`${process.env.VALIDATION_API_URL}?rules=AUNZ_UBL_1_0_10`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept-Language': 'en',
      },
    });

    console.log('Validation Result:', response.data);
    generatePDFReport(response.data, fileName);
  } catch (error) {
    console.error('Error validating UBL:', error.response ? error.response.data : error.message);
    if (error.response) {
      console.error('Status Code:', error.response.status);
      console.error('Headers:', error.response.headers);
      console.error('Data:', error.response.data);
    }
  }
};

const generatePDFReport = (validationResult, fileName) => {
  const doc = new PDFDocument();
  const outputPath = path.join(__dirname, 'validation_report.pdf');

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  doc.fontSize(20).text('UBL Validation Report', { align: 'center' });

  doc.moveDown().fontSize(14).text(`File: ${validationResult.report.filename}`);
  doc.text(`Validation Status: ${validationResult.report.summary}`);
  doc.text(`Total Failed Assertions: ${validationResult.report.firedAssertionErrorsCount}`);
  doc.text(`Total Successful Reports: ${validationResult.report.firedSuccessfulReportsCount}`);

  doc.moveDown().fontSize(16).text('Details:');

  const errors = validationResult.report.reports.AUNZ_UBL_1_0_10;

  if (validationResult.report.firedAssertionErrorsCount > 0 && errors) {
    Object.values(errors).forEach((error, index) => {
      doc.moveDown().fontSize(12).text(`Error ${index + 1}:`);
      doc.text(`  Message: ${error.message}`);
      doc.text(`  XPath: ${error.xpath}`);
      doc.text(`  Code: ${error.code}`);
    });
  } else {
    doc.moveDown().fontSize(12).text('No errors found.');
  }

  doc.end();

  stream.on('finish', function () {
    console.log(`PDF report generated at ${outputPath}`);
  });

  stream.on('error', function (err) {
    console.error('Error writing PDF file:', err);
  });
};



// const filePath = 'D:/comp3900/capstone-project-3900f18ahexahunks/backend/temp.xml';
const filePath = 'D:/comp3900/capstone-project-3900f18ahexahunks/backend/tests/validFile.xml';
validateUBL(filePath);
