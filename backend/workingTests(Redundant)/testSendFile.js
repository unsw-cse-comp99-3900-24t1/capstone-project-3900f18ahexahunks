const axios = require('axios');
const { ObjectId } = require('mongodb');
const testSendFile = async () => {
  const requestBody = {
    to: 'bzzzz19322@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email',
    html: '<h1>This is a test email</h1>',
    xmlId: '66ae18410dd755cf0383174d',
    pdfId: '66ae183d0dd755cf03831744',
    validatorPdfId: '66ae0801d1912cf6e5dd9451',
    message: 'Here are your requested files.',
    emailSubject: 'Your Requested Files',
    sharedObjId: 'sharedObjId123',
    process: 'process1',
    fileTypes: ['xml', 'pdf'],
    userId: '66ab737a0a9e08093aa3ebaf',
    _id: new ObjectId().toString()
  };

  try {
    const response = await axios.post('http://localhost:5003/api/sendFile', requestBody);
    console.log('Send File response:', response.data);
  } catch (error) {
    console.error('Error sending file:', error.response ? error.response.data : error.message);
  }
};

// Run the test function
testSendFile();