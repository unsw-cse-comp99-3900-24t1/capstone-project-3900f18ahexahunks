const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Function to test XML file upload
const testUploadXml = async () => {
  const form = new FormData();
  const userId = '667d275ae8f2a3c4ad112f76'; // Example userId

  // Append userId to form data
  form.append('userId', userId);

  // Append XML file to form data
  form.append('file', fs.createReadStream(path.join(__dirname, 'test13.xml')), 'test13.xml');

  try {
    const response = await axios.post('http://localhost:5003/upload/xml', form, {
      headers: {
        ...form.getHeaders(),
      },
    });
    console.log('Upload response:', response.data);
  } catch (error) {
    console.error('Error uploading XML file:', error.response ? error.response.data : error.message);
  }
};

// Run the test function
testUploadXml();
