const axios = require('axios');

const validateUBL = async (ublContent) => {
  try {
    const response = await axios.post('http://your-api-url/validate-ubl', {
      ValidateUbl: {
        UBL: ublContent,
      },
    }, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error validating UBL:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = validateUBL;
