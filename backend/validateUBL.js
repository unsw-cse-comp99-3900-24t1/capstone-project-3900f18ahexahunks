// require('dotenv').config();

// const axios = require('axios');
// const fs = require('fs');
// const crypto = require('crypto');
// const qs = require('qs');
// const PDFDocument = require('pdfkit');
// const path = require('path');

// console.log('TOKEN_ENDPOINT:', process.env.TOKEN_ENDPOINT);
// console.log('CLIENT_ID:', process.env.CLIENT_ID);
// console.log('CLIENT_SECRET:', process.env.CLIENT_SECRET);

// const getAuthToken = async () => {
//   try {
//     const params = qs.stringify({
//       grant_type: 'client_credentials',
//       client_id: process.env.CLIENT_ID,
//       client_secret: process.env.CLIENT_SECRET,
//       scope: 'eat/read',
//     });

//     const response = await axios.post(process.env.TOKEN_ENDPOINT, params, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     });

//     console.log('Auth token response:', response.data);
//     return response.data.access_token;
//   } catch (error) {
//     console.error('Error getting auth token:', error.response ? error.response.data : error.message);
//     if (error.response) {
//       console.error('Status Code:', error.response.status);
//       console.error('Headers:', error.response.headers);
//       console.error('Data:', error.response.data);
//     }
//     return null;
//   }
// };

// const validateUBL = async (filePath) => {
//   const token = await getAuthToken();
//   if (!token) {
//     console.log('Failed to get auth token.');
//     return;
//   }

//   const fileName = path.basename(filePath);
//   const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
//   const encodedContent = Buffer.from(fileContent).toString('base64');
//   const checksum = crypto.createHash('md5').update(encodedContent).digest('hex');

//   const payload = {
//     filename: fileName,
//     content: encodedContent,
//     checksum: checksum,
//   };

//   try {
//     const response = await axios.post(`${process.env.VALIDATION_API_URL}?rules=AUNZ_UBL_1_0_10`, payload, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//         'Accept-Language': 'en',
//       },
//     });

//     console.log('Validation Result:', response.data);
//     generatePDFReport(response.data, fileName);
//   } catch (error) {
//     console.error('Error validating UBL:', error.response ? error.response.data : error.message);
//     if (error.response) {
//       console.error('Status Code:', error.response.status);
//       console.error('Headers:', error.response.headers);
//       console.error('Data:', error.response.data);
//     }
//   }
// };

// const generatePDFReport = (validationResult, fileName) => {
//   const doc = new PDFDocument();
//   const outputPath = path.join(__dirname, 'validation_report.pdf');

//   const stream = fs.createWriteStream(outputPath);
//   doc.pipe(stream);

//   doc.fontSize(20).text('UBL Validation Report', { align: 'center' });

//   doc.moveDown().fontSize(14).text(`File: ${validationResult.report.filename}`);
//   doc.text(`Validation Status: ${validationResult.report.summary}`);
//   doc.text(`Total Failed Assertions: ${validationResult.report.firedAssertionErrorsCount}`);
//   doc.text(`Total Successful Reports: ${validationResult.report.firedSuccessfulReportsCount}`);

//   doc.moveDown().fontSize(16).text('Details:');

//   const errors = validationResult.report.reports.AUNZ_UBL_1_0_10.firedAssertionErrors;

//   if (validationResult.report.firedAssertionErrorsCount > 0 && errors && errors.length > 0) {
//     errors.forEach((error, index) => {
//       doc.moveDown().fontSize(12).text(`Error ${index + 1}:`);
//       doc.text(`  Issue: ${error.text}`);
//       doc.text(`  Location: ${error.location}`);
//       doc.text(`  Error Code: ${error.id}`);
//       doc.moveDown().fontSize(12).text(`Suggested Fix: ${getSuggestion(error.id)}`);
//     });
//   } else {
//     doc.moveDown().fontSize(12).text('No errors found.');
//   }

//   doc.end();

//   stream.on('finish', function () {
//     console.log(`PDF report generated at ${outputPath}`);
//   });

//   stream.on('error', function (err) {
//     console.error('Error writing PDF file:', err);
//   });
// };

// const getSuggestion = (errorCode) => {
//   switch (errorCode) {
//     case 'BR-09':
//       return 'Ensure the Seller address includes a country code. Example: <cbc:Country><cbc:IdentificationCode>US</cbc:IdentificationCode></cbc:Country>';
//     case 'BR-11':
//       return 'Ensure the Buyer address includes a country code. Example: <cbc:Country><cbc:IdentificationCode>US</cbc:IdentificationCode></cbc:Country>';
//     case 'BR-61':
//       return 'If the payment method is SEPA, Local, or International credit transfer, include the payment account identifier. Example: <cbc:ID>DE89370400440532013000</cbc:ID>';
//     default:
//       return 'Refer to the UBL 2.1 documentation for fixing this error.';
//   }
// };

// // const filePath = 'D:/comp3900/capstone-project-3900f18ahexahunks/backend/temp.xml';

// // const filePath = 'D:/comp3900/capstone-project-3900f18ahexahunks/backend/tests/UBL-Forecast-2.1-Example.xml';
// // const filePath = 'D:/comp3900/capstone-project-3900f18ahexahunks/backend/tests/test.xml';

// const filePath = 'D:/comp3900/capstone-project-3900f18ahexahunks/backend/tests/validFile.xml';
// // const filePath = 'D:/comp3900/capstone-project-3900f18ahexahunks/backend/tests/invalid-ubl.xml';

// validateUBL(filePath);




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

const validateUBL = async (fileContent, originalFileName) => {
  const token = await getAuthToken();
  if (!token) {
    console.log('Failed to get auth token.');
    return;
  }

  const encodedContent = Buffer.from(fileContent).toString('base64');
  const checksum = crypto.createHash('md5').update(encodedContent).digest('hex');

  const payload = {
    filename: originalFileName,
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
    response.data.report.filename = originalFileName; // Set the original file name in the report
    return response.data;
  } catch (error) {
    console.error('Error validating UBL:', error.response ? error.response.data : error.message);
    if (error.response) {
      console.error('Status Code:', error.response.status);
      console.error('Headers:', error.response.headers);
      console.error('Data:', error.response.data);
    }
    throw error;
  }
};

const generatePDFReport = (validationResult, fileName) => {
  const doc = new PDFDocument();
  const outputPath = path.join(__dirname, 'uploads', `${fileName}-validation_report.pdf`);

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  doc.fontSize(20).text('UBL Validation Report', { align: 'center' });

  doc.moveDown().fontSize(14).text(`File: ${validationResult.report.filename}`);
  doc.text(`Validation Status: ${validationResult.report.summary}`);
  doc.text(`Total Failed Assertions: ${validationResult.report.firedAssertionErrorsCount}`);
  doc.text(`Total Successful Reports: ${validationResult.report.firedSuccessfulReportsCount}`);

  doc.moveDown().fontSize(16).text('Details:');

  const errors = validationResult.report.reports.AUNZ_UBL_1_0_10.firedAssertionErrors;

  if (validationResult.report.firedAssertionErrorsCount > 0 && errors && errors.length > 0) {
    errors.forEach((error, index) => {
      doc.moveDown().fontSize(12).text(`Error ${index + 1}:`);
      doc.text(`  Issue: ${error.text}`);
      doc.text(`  Location: ${error.location}`);
      doc.text(`  Error Code: ${error.id}`);
      doc.moveDown().fontSize(12).text(`Suggested Fix: ${getSuggestion(error.id)}`);
    });
  } else {
    doc.moveDown().fontSize(12).text('No errors found.');
  }

  doc.end();

  return outputPath;
};

const getSuggestion = (errorCode) => {
  switch (errorCode) {
    case 'BR-09':
      return 'Please make sure the Seller address includes a country code. Example: <cbc:Country><cbc:IdentificationCode>US</cbc:IdentificationCode></cbc:Country>';
    case 'BR-11':
      return 'Please make sure the Buyer address includes a country code. Example: <cbc:Country><cbc:IdentificationCode>US</cbc:IdentificationCode></cbc:Country>';
    case 'BR-61':
      return 'If the payment method is SEPA, Local, or International credit transfer, please include the payment account identifier. Example: <cbc:ID>DE89370400440532013000</cbc:ID>';
    default:
      return 'Please refer to the UBL 2.1 documentation for fixing this error.';
  }
};

module.exports = { validateUBL, generatePDFReport };
