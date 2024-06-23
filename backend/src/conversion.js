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

module.exports = {
    convertPdfToJson,
    convertJsonToUbl
};
