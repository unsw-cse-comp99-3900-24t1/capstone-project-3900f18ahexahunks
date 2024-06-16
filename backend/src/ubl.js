import { getData, setData } from './dataStore';

// Initialize data
// let data = {
//     ubls: [{ ublId: '123' }],
//     pdfs: [{ pdfId: '456' }]
// };

export function deleteUbl(ublId, pdfId) {
  const dataStore = getData();

  // Validate UBL and PDF IDs
  if (!ublId || !pdfId) {
    return {
      status: 400,
      json: {
        error: ['UBL Id and PDF Id are required'],
        details: "As errors"
      }
    };
  }

  if (!dataStore.ubls.some(item => item.ublId === ublId)) {
    return {
      status: 400,
      json: {
        error: ['UBL Id does not exist'],
        details: "As errors"
      }
    };
  }

  if (!dataStore.pdfs.some(item => item.pdfId === pdfId)) {
    return {
      status: 400,
      json: {
        error: ['PDF Id does not exist'],
        details: "As errors"
      }
    };
  }

  // Perform the delete operation
  dataStore.ubls = dataStore.ubls.filter(item => item.ublId !== ublId);
  dataStore.pdfs = dataStore.pdfs.filter(item => item.pdfId !== pdfId);

  // Simulate a possible server error
  // if (Math.random() < 0.1) {
  //   return {
  //     status: 500,
  //     json: {
  //       error: "Server error, please try again later"
  //     }
  //   };
  // }

  // Update the data store
  setData(dataStore);

  // Example data initialization (if no application.json exists)
  // This is useful for initial server setup
  // if (!fs.existsSync('./application.json')) {
  //   setData(data);
  // }

  // Return success response
  return {
    status: 200,
    json: {
      "UBL-id": ublId,
      "PDF-id": pdfId,
      message: 'Successfully deleted UBL and PDF references'
    }
  };
}
