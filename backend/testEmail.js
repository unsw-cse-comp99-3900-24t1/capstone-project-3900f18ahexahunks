const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const testEmail = async () => {
  const form = new FormData();
  form.append('recipient', '1293465052@qq.com');
  form.append('subject', 'Test Subject');
  form.append('text', 'Test Body');
  form.append('attachment', fs.createReadStream('./test22.pdf'));

  try {
    const response = await axios.post('http://localhost:5003/api/send-invoice', form, {
      headers: {
        ...form.getHeaders(),
      },
    });
    console.log('Email sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending email:', error.response ? error.response.data : error.message);
  }
};

testEmail();
