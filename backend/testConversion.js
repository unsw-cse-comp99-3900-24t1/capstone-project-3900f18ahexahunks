const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

// Function to test PDF to UBL XML conversion
const testConvertPdfToUbl = async () => {
  const form = new FormData();
  const userId = "66ab737a0a9e08093aa3ebaf"; // Example userId

  // Append userId to form data
  form.append("userId", userId);

  // Append PDF file to form data
  form.append(
    "file",
    fs.createReadStream(path.join(__dirname, "Invoice_001.pdf")),
    "Invoice_001.pdf"
  );

  try {
    const response = await axios.post(
      "http://localhost:5003/api/upload-pdf",
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
      }
    );
    console.log("PDF to UBL XML Conversion response:", response.data);
  } catch (error) {
    console.error(
      "Error converting PDF to UBL XML:",
      error.response ? error.response.data : error.message
    );
  }
};

// Function to test GUI to UBL XML conversion
const testConvertGuiToUbl = async () => {
  const userId = "66ab737a0a9e08093aa3ebaf"; // Example userId

  // Read GUI data from file
  const guiData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "sample_gui.json"), "utf8")
  );
  console.log(guiData);
  try {
    const response = await axios.post("http://localhost:5003/api/gui-form", {
      userId: userId,
      invoice: guiData,
    });
    console.log("GUI to UBL XML Conversion response:", response.data);
  } catch (error) {
    console.error(
      "Error converting GUI to UBL XML:",
      error.response ? error.response.data : error.message
    );
  }
};

// Run the test functions
//testConvertPdfToUbl();
testConvertGuiToUbl();
