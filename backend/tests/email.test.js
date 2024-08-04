const axios = require('axios');
const { ObjectId } = require('mongodb');

// Mocking the axios post method
jest.mock('axios');

describe('sendFile API', () => {
  it('should send email with attachments successfully', async () => {
    const requestBody = {
      to: 'bzzzz19322@gmail.com',
      subject: 'Test Email',
      text: 'This is a test email',
      html: '<h1>This is a test email</h1>',
      xmlId: '66ae18410dd755cf0383174d',
      pdfId: '66ae183d0dd755cf03831744',
      validatorPdfId: '66ae0801d1912cf6e5dd9451',
      message: 'Here are your requested files.',
      emailSubject: 'Your Requested Files',
      sharedObjId: 'sharedObjId123',
      process: 'process1',
      fileTypes: ['xml', 'pdf'],
      userId: '66ab737a0a9e08093aa3ebaf',
      _id: new ObjectId().toString()
    };

    const mockResponse = {
      data: { message: 'Email sent with attachments successfully' }
    };

    // Mock the axios post method to return the mock response
    axios.post.mockResolvedValue(mockResponse);

    // Perform the API call
    const response = await axios.post('http://localhost:5003/api/sendFile', requestBody);

    // Assertions
    expect(response.data).toEqual(mockResponse.data);
    expect(response.data.message).toBe('Email sent with attachments successfully');
  });

  it('should return error if email sending fails', async () => {
    const requestBody = {
      to: 'bzzzz19322@gmail.com',
      subject: 'Test Email',
      text: 'This is a test email',
      html: '<h1>This is a test email</h1>',
      xmlId: '66ae18410dd755cf0383174d',
      pdfId: '66ae183d0dd755cf03831744',
      validatorPdfId: '66ae0801d1912cf6e5dd9451',
      message: 'Here are your requested files.',
      emailSubject: 'Your Requested Files',
      sharedObjId: 'sharedObjId123',
      process: 'process1',
      fileTypes: ['xml', 'pdf'],
      userId: '66ab737a0a9e08093aa3ebaf',
      _id: new ObjectId().toString()
    };

    const mockError = {
      response: {
        data: { error: 'Internal server error' }
      }
    };

    // Mock the axios post method to return the mock error
    axios.post.mockRejectedValue(mockError);

    try {
      await axios.post('http://localhost:5003/sendFile', requestBody);
    } catch (error) {
      // Assertions
      expect(error.response.data).toEqual(mockError.response.data);
      expect(error.response.data.error).toBe('Internal server error');
    }
  });
});