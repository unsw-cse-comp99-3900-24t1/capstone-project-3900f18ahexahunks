const Pdf = require('../models/Pdf');

exports.convertPdfToUbl = async (req, res) => {
  const { pdf } = req.body;

  try {
    // Assume some PDF to UBL conversion logic here
    const ubl = convertToUbl(pdf);

    res.set('Content-Type', 'application/xml');
    res.send(ubl);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};

exports.getPdfsAndUbls = async (req, res) => {
  const { userId } = req.params;

  try {
    const pdfs = await Pdf.find({ userId });
    if (!pdfs.length) {
      return res.status(404).send('No PDFs or UBLs found for the user');
    }
    res.json({ pdfs });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error, please try again later');
  }
};

exports.deletePdfUbl = async (req, res) => {
  const { UBLid, PDFid } = req.body;

  try {
    await Pdf.findByIdAndDelete(PDFid);
    // Assume UBL deletion logic here

    res.json({
      UBLid,
      PDFid,
      message: 'Successfully deleted UBL and PDF'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};
