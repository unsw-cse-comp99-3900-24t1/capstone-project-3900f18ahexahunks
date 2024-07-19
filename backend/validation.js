const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
require('dotenv').config();

async function getToken() {
    const tokenUrl = 'https://dev-eat.auth.eu-central-1.amazoncognito.com/oauth2/token';
    const client_id = '7d30bi87iptegbrf2bp37p42gg';
    const client_secret = '880tema3rvh3h63j4nquvgoh0lgts11n09bq8597fgrkvvd62su';
    const scope = 'eat/read';

    const response = await axios.post(tokenUrl, null, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        params: {
            grant_type: 'client_credentials',
            client_id: client_id,
            client_secret: client_secret,
            scope: scope
        }
    });

    return response.data.access_token;
}

async function validateXML(filePath) {
    const token = await getToken();
    const xmlContent = fs.readFileSync(filePath, 'utf8');

    const formData = new FormData();
    formData.append('filename', path.basename(filePath));
    formData.append('content', Buffer.from(xmlContent).toString('base64'));
    formData.append('checksum', require('crypto').createHash('md5').update(Buffer.from(xmlContent).toString('base64')).digest('hex'));

    const response = await axios.post('https://edi-services.ebxcloud.com/ess-schematron/v1/api/validate', formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            ...formData.getHeaders()
        }
    });

    return response.data;
}

// Example usage
const filePath = path.join(__dirname, 'tests', 'testData', 'testFile_1.xml');
validateXML(filePath).then(result => {
    console.log('Validation Result:', result);
    fs.writeFileSync('validationResult.json', JSON.stringify(result, null, 2));
}).catch(err => {
    console.error('Error validating XML:', err);
});

module.exports = { validateXML };
