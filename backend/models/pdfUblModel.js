const mongoose = require('mongoose');
const User = require('./user');
const File = require('./file');

const getPdfUblService = async (userEmail) => {
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

    if (!user) {
      return {
        status: 404,
        json: { error: 'user email not found' }
      };
    }

    if (!user.token) {
      return {
        status: 401,
        json: { error: 'user not logged in' }
      };
    }

    const files = await File.find({ 'metadata.userId': user._id });

    if (files.length === 0) {
      return {
        status: 404,
        json: { error: 'No PDFs or UBLs found for the user' }
      };
    }

    const pdfResults = files.filter(file => file.contentType === 'application/pdf').map(file => ({
      id: file._id,
      length: file.length,
      timestamp: file.uploadDate,
      filename: file.filename,
      url: `http://localhost:5003/file/${file._id}`
    }));

    const ublResults = files.filter(file => file.contentType === 'application/xml').map(file => ({
      id: file._id,
      length: file.length,
      timestamp: file.uploadDate,
      filename: file.filename,
      url: `http://localhost:5003/file/${file._id}`
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

const deletePdfUblService = async (pdfId, ublId) => {
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
    const pdfFile = await File.findById(pdfId);
    const ublFile = await File.findById(ublId);

    if (!pdfFile || !ublFile) {
      return {
        status: 404,
        json: { error: 'PDF or UBL not found' }
      };
    }

    if (!pdfFile.metadata.userId.equals(ublFile.metadata.userId)) {
      return {
        status: 403,
        json: { error: 'Files do not belong to the same user' }
      };
    }

    const user = await User.findById(pdfFile.metadata.userId);

    if (!user || !user.token) {
      return {
        status: 401,
        json: { error: 'User not logged in or invalid user' }
      };
    }

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
