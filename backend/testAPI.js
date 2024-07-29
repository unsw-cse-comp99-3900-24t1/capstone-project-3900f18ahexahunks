const axios = require('axios');
const fs = require('fs');

// Read the file and convert it to base64
const filePath = 'Invoice_001.pdf';
const fileBuffer = fs.readFileSync(filePath);
const base64File = fileBuffer.toString('base64');

// Determine the mimeType of the file
const mimeType = 'text/plain'; // Replace with the correct mimeType of your file

const data = {
  file: base64File,
  mimeType: mimeType,
};

// Define the headers
const headers = {
  'api-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEifQ.eyJpZCI6InphSk5HYXpEdmVyUFRwUDZRU2VYQiIsInR5cGUiOiJVU0VSIiwicHJvamVjdElkIjoieXBRSmo0bDdlbEpyZFdGb2RFakx4IiwicGxhdGZvcm0iOnsiaWQiOiIwb2lpQTZwQ0hjUnloMVJraGJOVlUiLCJyb2xlIjoiTUVNQkVSIn0sImlhdCI6MTcyMTk2NTU0NCwiZXhwIjoxNzIyNTcwMzQ0LCJpc3MiOiJhY3RpdmVwaWVjZXMifQ.mJuI93sq6jp6MqwKQWad00dxFTDgyjPuQaNIu7kyDow'
};

// Send the POST request with the base64-encoded file and mimeType
axios.post('https://workflow.upbrainsai.com/api/v1/webhooks/CjAdbukWyqvA2uQPRfKem', data, { headers })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
