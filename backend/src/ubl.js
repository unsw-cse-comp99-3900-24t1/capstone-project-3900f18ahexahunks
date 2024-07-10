const connectDB = require('./db'); // import the database connection
const { ObjectId } = require('mongodb');

// Fetch PDFs and UBLs for a user
async function getPdfUbl(userEmail) {
  // Validate user email
  if (!userEmail) {
    return {
      status: 400,
      json: {
        error: ['user Id is required'],
        details: "As errors"
      }
    };
  }

  const client = await connectDB();
  const db = client.db();

  try {
    // Get userId from user email
    const user = await db.collection('users').findOne({ "email": userEmail });

    if (!user) {
      return {
        status: 404,
        json: { error: 'user email not found' }
      };
    }

    // Validate token to ensure user has logged in
    if (!user.token) {
      return {
        status: 401,
        json: { error: 'user not logged in' }
      };
    }

    // Convert userId to ObjectId
    const userObjectId = new ObjectId(user._id);

    // Find PDFs and UBLs with the userId
    const files = await db.collection('uploads.files').find({ "metadata.userId": userObjectId }).toArray();

    if (files.length === 0) {
      return {
        status: 404,
        json: { error: 'No PDFs or UBLs found for the user' }
      };
    }

    // Format the response
    const pdfResults = files.filter(file => file.contentType === 'application/pdf').map(file => ({
      id: file._id,
      length: file.length,
      timestamp: file.uploadDate,
      filename: file.filename,
      url: file.metadata.url
    }));

    const ublResults = files.filter(file => file.contentType === 'application/xml').map(file => ({
      id: file._id,
      length: file.length,
      timestamp: file.uploadDate,
      filename: file.filename,
      url: file.metadata.url
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
  } finally {
    client.close();
  }
}

// Delete PDFs and UBLs
async function deletePdfUbl(pdfId, ublId) {
  // Validate UBL and PDF IDs
  if (!pdfId || !ublId) {
    return {
      status: 400,
      json: {
        error: ['PDF Id and UBL Id are required'],
        details: "As errors"
      }
    };
  }

  const client = await connectDB();
  const db = client.db();

  try {
    // Convert IDs to ObjectId
    const pdfObjectId = new ObjectId(pdfId);
    const ublObjectId = new ObjectId(ublId);

    // Find the files
    const pdfFile = await db.collection('uploads.files').findOne({ _id: pdfObjectId });
    const ublFile = await db.collection('uploads.files').findOne({ _id: ublObjectId });

    if (!pdfFile || !ublFile) {
      return {
        status: 404,
        json: { error: 'PDF or UBL not found' }
      };
    }

    // Get the userId from the files
    const userIdFromPdf = pdfFile.metadata.userId;
    const userIdFromUbl = ublFile.metadata.userId;

    // Ensure the files belong to the same user
    if (!userIdFromPdf.equals(userIdFromUbl)) {
      return {
        status: 403,
        json: { error: 'Files do not belong to the same user' }
      };
    }

    // Validate user login status
    const user = await db.collection('users').findOne({ _id: userIdFromPdf });

    if (!user || !user.token) {
      return {
        status: 401,
        json: { error: 'User not logged in or invalid user' }
      };
    }

    // Perform the delete operation
    const pdfResult = await db.collection('uploads.files').deleteOne({ _id: pdfObjectId });
    const ublResult = await db.collection('uploads.files').deleteOne({ _id: ublObjectId });

    if (pdfResult.deletedCount === 0 || ublResult.deletedCount === 0) {
      return {
        status: 400,
        json: {
          error: ['Unable to delete PDF and UBL'],
          details: "As errors"
        }
      };
    }

    // Perform the delete operation for chunks
    await db.collection('uploads.chunks').deleteMany({ files_id: pdfObjectId });
    await db.collection('uploads.chunks').deleteMany({ files_id: ublObjectId });

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
  } finally {
    client.close();
  }
}


module.exports = {
  getPdfUbl,
  deletePdfUbl
};
