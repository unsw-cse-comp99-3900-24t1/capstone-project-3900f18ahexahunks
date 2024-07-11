const xpath = require('xpath');
const dom = require('xmldom').DOMParser;

function validateUBL(xml, fileName) {
  try {
    const doc = new dom().parseFromString(xml);
    const select = xpath.useNamespaces({
      "": "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
      "cbc": "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",
      "cac": "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
      "ext": "urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2"
    });

    const invoiceIdNode = select('cbc:ID/text()', doc);
    const issueDateNode = select('cbc:IssueDate/text()', doc);

    const validationResults = {
      fileDetails: {
        fileName: fileName || 'Unknown',
        fileType: 'UBL Invoice',
        submissionDate: issueDateNode.length ? issueDateNode[0].nodeValue : 'Unknown',
        checkedBy: 'DB_CEO_TC'
      },
      validationSummary: {
        validationStatus: 'Passed',
        totalChecksPerformed: 0,
        checksPassed: 0,
        checksFailed: 0
      },
      detailedFindings: {},
      recommendations: [],
      conclusion: {},
      reportGeneratedBy: 'DB_CEO_TC',
      reportDate: new Date().toISOString().split('T')[0]
    };

    const checks = [
      {
        field: 'generalInformation',
        xpath: 'cbc:ID',
        description: 'The UBL file contains the required general information including invoice number, issue date, and supplier details.',
        expected: 'An invoice number and issue date should be present.',
        found: invoiceIdNode.length ? invoiceIdNode[0].nodeValue : 'Missing'
      },
      // add more checks as needed in future
    ];

    checks.forEach((check, index) => {
      validationResults.validationSummary.totalChecksPerformed += 1;
      const nodes = select(check.xpath, doc);
      if (nodes.length === 0 || !nodes[0].nodeValue) {
        validationResults.validationSummary.checksFailed += 1;
        validationResults.detailedFindings[check.field] = {
          validationStatus: 'Failed',
          description: check.description,
          expected: check.expected,
          found: check.found
        };
      } else {
        validationResults.validationSummary.checksPassed += 1;
        validationResults.detailedFindings[check.field] = {
          validationStatus: 'Passed',
          description: check.description
        };
      }
    });

    if (validationResults.validationSummary.checksFailed > 0) {
      validationResults.validationSummary.validationStatus = 'Failed';
      validationResults.recommendations.push('Ensure all required fields are present and correctly formatted.');
      validationResults.conclusion.text = 'The UBL invoice file has failed the validation. Please rectify the identified issues and resubmit the invoice for validation.';
    } else {
      validationResults.conclusion.text = 'The UBL invoice file has passed the validation.';
    }

    return validationResults;
  } catch (error) {
    console.error('Error during UBL validation:', error);
    return {
      validationStatus: 'Failed',
      message: `Validation failed: ${error.message}`
    };
  }
}

module.exports = { validateUBL };
