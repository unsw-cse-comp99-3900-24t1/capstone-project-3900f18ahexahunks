const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Function to test file upload
const testUpload = async () => {
  const form = new FormData();
  const userId = '667d275ae8f2a3c4ad112f76'; // Example userId

  // Append userId to form data
  form.append('userId', userId);

  // Append files to form data
  form.append('pdf', fs.createReadStream(path.join(__dirname, 'test1.pdf')), 'test1.pdf');
  form.append('xml', fs.createReadStream(path.join(__dirname, 'test1.xml')), 'test1.xml');

  try {
    const response = await axios.post('http://localhost:5003/upload', form, {
      headers: {
        ...form.getHeaders(),
      },
    });
    console.log('Upload response:', response.data);
  } catch (error) {
    console.error('Error uploading files:', error.response ? error.response.data : error.message);
  }
};

// Run the test function
testUpload();
