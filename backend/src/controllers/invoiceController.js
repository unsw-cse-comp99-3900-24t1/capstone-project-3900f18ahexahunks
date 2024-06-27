const Invoice = require('../models/Invoice');

exports.getEInvoicingRules = async (req, res) => {
  try {
    const rules = await Invoice.find();
    res.json({ rules });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error, please try again later');
  }
};
