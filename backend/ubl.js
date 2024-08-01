const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

const generatePDFReport = (validationResult) => {
  const doc = new PDFDocument();
  const reportPath = path.join(__dirname, 'validation_report.pdf');
  
  doc.pipe(fs.createWriteStream(reportPath));

  doc.fontSize(25).text('UBL Validation Report', { align: 'center' });

  doc.fontSize(16).text('Validation Summary', { underline: true });
  doc.fontSize(12).text(`Validation Status: ${validationResult.validationStatus}`);
  doc.text(`Total Checks Performed: ${validationResult.totalChecksPerformed}`);
  doc.text(`Checks Passed: ${validationResult.checksPassed}`);
  doc.text(`Checks Failed: ${validationResult.checksFailed}`);

  doc.addPage();
  doc.fontSize(16).text('Detailed Findings', { underline: true });
  Object.keys(validationResult.detailedFindings).forEach((key) => {
    const finding = validationResult.detailedFindings[key];
    doc.fontSize(14).text(key, { underline: true });
    doc.fontSize(12).text(`Validation Status: ${finding.validationStatus}`);
    doc.text(`Description: ${finding.description}`);
    if (finding.expected) {
      doc.text(`Expected: ${finding.expected}`);
      doc.text(`Found: ${finding.found}`);
    }
    doc.moveDown();
  });

  doc.end();

  return reportPath;
};

const mockValidateUBL = (ublContent) => {
  // Mock validation result
  return {
    validationStatus: 'Failed',
    totalChecksPerformed: 15,
    checksPassed: 12,
    checksFailed: 3,
    detailedFindings: {
      generalInformation: {
        validationStatus: 'Passed',
        description: 'The UBL file contains the required general information including invoice number, issue date, and supplier details.'
      },
      businessIdentifier: {
        validationStatus: 'Passed',
        description: 'The supplier\'s ABN (Australian Business Number) is present and correctly formatted.'
      },
      buyerAndSellerInformation: {
        validationStatus: 'Passed',
        description: 'The buyer and seller information is complete and includes names, addresses, and contact details.'
      },
      invoiceCurrencyCode: {
        validationStatus: 'Passed',
        description: 'The currency code is provided and correctly formatted as per ISO 4217 standards.'
      },
      invoiceAmounts: {
        validationStatus: 'Passed',
        description: 'The total invoice amount, including tax and net amount, is correctly calculated and presented.'
      },
      taxInformation: {
        validationStatus: 'Failed',
        description: 'The tax details are incomplete. The GST (Goods and Services Tax) amount is not specified.',
        expected: 'GST amount should be specified as per Australian tax laws.',
        found: 'Missing GST amount.'
      },
      paymentTerms: {
        validationStatus: 'Passed',
        description: 'Payment terms are clearly stated, including payment due date and any discount conditions.'
      },
      lineItemDetails: {
        validationStatus: 'Passed',
        description: 'Line item details are correctly provided, including item description, quantity, unit price, and total amount.'
      },
      taxCategoryCode: {
        validationStatus: 'Failed',
        description: 'The tax category code for line items is incorrect. It does not match the standard GST codes.',
        expected: 'GST codes should be in accordance with Australian tax codes.',
        found: 'Incorrect tax category code.'
      },
      legalMonetaryTotal: {
        validationStatus: 'Passed',
        description: 'The legal monetary total, including total amount payable, is correctly calculated and displayed.'
      },
      allowancesAndCharges: {
        validationStatus: 'Passed',
        description: 'Any allowances and charges are correctly documented and included in the invoice total.'
      },
      buyerReference: {
        validationStatus: 'Passed',
        description: 'Buyer reference is present and correctly formatted.'
      },
      deliveryInformation: {
        validationStatus: 'Passed',
        description: 'Delivery details, including delivery address and date, are correctly provided.'
      },
      additionalSupportingDocuments: {
        validationStatus: 'Failed',
        description: 'Supporting documents such as purchase order references are missing.',
        expected: 'References to supporting documents should be included.',
        found: 'Missing purchase order references.'
      },
      signature: {
        validationStatus: 'Passed',
        description: 'Digital signature is present and valid.'
      }
    }
  };
};

module.exports = {
  generatePDFReport,
  mockValidateUBL
};
