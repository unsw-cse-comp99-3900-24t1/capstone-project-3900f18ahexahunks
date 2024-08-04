const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Mock data
const sampleGuiDataPath = path.join(__dirname, '/testJSONs/sample_gui.json');
const samplePdfPath = path.join(__dirname, './testPDFs/Invoice_001.pdf');
const userId = '66ab737a0a9e08093aa3ebaf'; // Example userId

describe('Conversion Tests', () => {
  // Function to test PDF to UBL XML conversion
  test('Convert PDF to UBL XML', async () => {
    const form = new FormData();

    // Append userId to form data
    form.append('userId', userId);

    // Append PDF file to form data
    form.append('file', fs.createReadStream(samplePdfPath), 'Invoice_001.pdf');

    try {
      const response = await axios.post('http://localhost:5003/upload-pdf', form, {
        headers: {
          ...form.getHeaders(),
        },
      });
      console.log('PDF to UBL XML Conversion response:', response.data);
      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('message', 'File converted and user updated successfully!');
    } catch (error) {
      console.error('Error converting PDF to UBL XML:', error.response ? error.response.data : error.message);
      throw error;
    }
  });

  // Function to test GUI to UBL XML conversion
  test('Convert GUI to UBL XML', async () => {
    // Read GUI data from file
    const guiData = JSON.parse(fs.readFileSync(sampleGuiDataPath, 'utf8'));

    try {
      const response = await axios.post('http://localhost:5003/gui-form', {
        userId: userId,
        guiData: guiData
      });
      console.log('GUI to UBL XML Conversion response:', response.data);
      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('message', 'GUI data converted and user updated successfully!');
    } catch (error) {
      console.error('Error converting GUI to UBL XML:', error.response ? error.response.data : error.message);
      throw error;
    }
  });
});