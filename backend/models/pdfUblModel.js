const User = require('./user');
const File = require('./file');

// Service to get PDF and UBL files for a user
const getPdfUblService = async (userEmail) => {
  // Check if user email is provided
  if (!userEmail) {
    return {
      status: 400,
      json: {
        error: ['user Id is required'],
        details: "As errors"
      }
    };
  }

  try {
    const user = await User.findOne({ email: userEmail });

    // Check if user exists
    if (!user) {
      return {
        status: 404,
        json: { error: 'user email not found' }
      };
    }

    // Find user by email
    const files = await File.find({ 'metadata.userId': user._id }).lean();

    // Check if PDFs or UBLs are found
    if (files.length === 0) {
      return {
        status: 404,
        json: { error: 'No PDFs or UBLs found for the user' }
      };
    }

    // Filter and map PDF and UBL files
    const pdfResults = files.filter(file => file.contentType === 'application/pdf').map(file => ({
      id: file._id,
      length: file.length,
      timestamp: file.uploadDate,
      filename: file.filename,
      url: `http://localhost:5003/getFile?fileId=${file._id}`
    }));

    const ublResults = files.filter(file => file.contentType === 'application/xml').map(file => ({
      id: file._id,
      length: file.length,
      timestamp: file.uploadDate,
      filename: file.filename,
      url: `http://localhost:5003/getFile?fileId=${file._id}`
    }));

    return {
      status: 200,
      json: {
        pdfs: pdfResults,
        ubls: ublResults
      }
    };
  } catch (error) {
    return {
      status: 500,
      json: { error: 'Server error, please try again later' }
    };
  }
};

// Service to delete PDF and UBL files
const deletePdfUblService = async (pdfId, ublId) => {
  // Check if PDF and UBL Ids are provided
  if (!pdfId || !ublId) {
    return {
      status: 400,
      json: {
        error: ['PDF Id and UBL Id are required'],
        details: "As errors"
      }
    };
  }

  try {
    // Find PDF and UBL files by Id
    const pdfFile = await File.findById(pdfId);
    const ublFile = await File.findById(ublId);

    // Check if PDF and UBL files exist
    if (!pdfFile || !ublFile) {
      return {
        status: 404,
        json: { error: 'PDF or UBL not found' }
      };
    }

    // Check if PDF and UBL files belong to the same user
    if (!pdfFile.metadata.userId.equals(ublFile.metadata.userId)) {
      return {
        status: 403,
        json: { error: 'Files do not belong to the same user' }
      };
    }

    // Delete PDF and UBL files
    await File.deleteOne({ _id: pdfId });
    await File.deleteOne({ _id: ublId });

    return {
      status: 200,
      json: {
        "PDF-id": pdfId,
        "UBL-id": ublId,
        message: 'Successfully deleted PDF and UBL references'
      }
    };
  } catch (error) {
    return {
      status: 500,
      json: { error: 'Server error, please try again later' }
    };
  }
};

module.exports = {
  getPdfUblService,
  deletePdfUblService
};
