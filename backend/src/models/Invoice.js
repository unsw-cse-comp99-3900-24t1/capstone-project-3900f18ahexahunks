const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  rules: {
    type: Map,
    of: String
  }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
