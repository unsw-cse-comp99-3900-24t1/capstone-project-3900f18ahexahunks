const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const { convertJsonToUbl } = require('./jsonToUbl');

const UPBRAINS_API_URL = 'https://api.upbrainsai.com/pdf-to-json';
const UPBRAINS_API_KEY = 'oZNEo-1Jq3Okd6JNu94DzwB9W3oHFW0jMESJNme186sfY803YA7GkdxIO0xc';

/**
 * Convert PDF to JSON using UpbrainAI API
 * @param {string} filePath - The path to the PDF file to be converted
 * @returns {Promise<object>} - The JSON representation of the PDF data
 */
async function convertPdfToJson(filePath) {
    try {
        const form = new FormData();
        form.append('file', fs.createReadStream(filePath));

        const response = await axios.post(UPBRAINS_API_URL, form, {
            headers: {
                ...form.getHeaders(),
                'Authorization': `Bearer ${UPBRAINS_API_KEY}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error converting PDF to JSON:', error.message);
        throw error;
    }
}

/**
 * Convert a local PDF file to UBL XML
 * @param {string} pdfFilePath - The path to the local PDF file
 * @returns {Promise<string>} - The UBL XML string
 */
async function convertPdfToUbl(pdfFilePath) {
    try {
      const jsonData = await convertPdfToJson(pdfFilePath);
      const ublXml = convertJsonToUbl(jsonData);
      return ublXml;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw {
          status: 400,
          message: {
            error: 'Insufficient data in the PDF, please add more information',
            requiredInformation: error.response.data.requiredInformation || [],
          },
        };
      } else if (error.response && error.response.status === 404) {
        throw {
          status: 404,
          message: { error: 'Failed to convert PDF to UBL' },
        };
      } else {
        throw {
          status: 500,
          message: { error: 'Server error, please try again later' },
        };
      }
    }
  }

module.exports = {
    convertPdfToJson,
    convertJsonToUbl
};

module.exports = { convertPdfToUbl };