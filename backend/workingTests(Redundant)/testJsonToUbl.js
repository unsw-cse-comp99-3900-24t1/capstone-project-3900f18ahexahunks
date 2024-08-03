const fs = require('fs');
const path = require('path');
const { convertJsonToUbl } = require('../src/jsonToUbl');

// Function to test the JSON to UBL conversion
const testJsonToUblConversion = () => {
  const inputFilePath = path.join(__dirname, 'testJSONs/Invoice.json');
  const outputFilePath = path.join(__dirname, 'testXMLs/output.xml');

  // Read the sample JSON file
  fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading input file:', err);
      return;
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Convert JSON to UBL XML
    const ublXml = convertJsonToUbl(jsonData);

    // Ensure the output directory exists
    fs.mkdir(path.dirname(outputFilePath), { recursive: true }, (err) => {
      if (err) {
        console.error('Error creating output directory:', err);
        return;
      }

      // Write the UBL XML to an output file
      fs.writeFile(outputFilePath, ublXml, (err) => {
        if (err) {
          console.error('Error writing output file:', err);
          return;
        }
        console.log('UBL XML file has been written to', outputFilePath);
      });
    });
  });
};

// Run the test
testJsonToUblConversion();
