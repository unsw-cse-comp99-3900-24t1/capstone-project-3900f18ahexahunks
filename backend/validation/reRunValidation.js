const validateUbl = require('./validateUbl');

// A dummy database function to get UBL content by ID
const getUblContentById = (ublId) => {
    // here should be replaced with actual database retrieval logic
    const dummyDatabase = {
        '123': '<UBL><SomeContent>...</SomeContent></UBL>',
        // here can add more UBL records as needed
    };
    return dummyDatabase[ublId] || null;
};

const rerunValidation = (ublId) => {
    const ublContent = getUblContentById(ublId);
    if (!ublContent) {
        throw new Error('UBL content not found for the provided ID');
    }
    // call the validateUbl function with the retrieved UBL content
    const validationResult = validateUbl(ublContent);
    return validationResult;
};

module.exports = rerunValidation;
