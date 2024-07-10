const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Function to test PDF file upload
const testUploadPdf = async () => {
  const form = new FormData();
  const userId = '668c7ffc63a00dcb00adf486'; // Example userId

  // Append userId to form data
  form.append('userId', userId);

  // Append PDF file to form data
  form.append('file', fs.createReadStream(path.join(__dirname, 'test16.pdf')), 'test16.pdf');

  try {
    const response = await axios.post('http://localhost:5003/upload/pdf', form, {
      headers: {
        ...form.getHeaders(),
      },
    });
    console.log('Upload response:', response.data);
  } catch (error) {
    console.error('Error uploading PDF file:', error.response ? error.response.data : error.message);
  }
};

// Run the test function
testUploadPdf();
