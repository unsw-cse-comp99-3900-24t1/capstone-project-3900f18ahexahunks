const { getPdfUblService, deletePdfUblService } = require('../../models/pdfUblModel');

// Controller function to get a PDF and UBL file
const getPdfUbl = async (req, res) => {
  const { userId } = req.params;
  const response = await getPdfUblService(userId);

  return res.status(response.status).json(response.json);
};

// Controller function to delete a PDF and UBL file
const deletePdfUbl = async (req, res) => {
  const { "PDF-id": pdfId, "UBL-id": ublId } = req.body;
  const response = await deletePdfUblService(pdfId, ublId);

  return res.status(response.status).json(response.json);
};

module.exports = { getPdfUbl, deletePdfUbl };
