const mongoose = require('mongoose');

const ValidationReportSchema = new mongoose.Schema({
  fileName: String,
  fileType: String,
  submissionDate: Date,
  checkedBy: String,
  validationSummary: Object,
  detailedFindings: Object,
  recommendations: [String],
  conclusion: Object,
  reportGeneratedBy: String,
  reportDate: Date
});

module.exports = mongoose.model('ValidationReport', ValidationReportSchema);
