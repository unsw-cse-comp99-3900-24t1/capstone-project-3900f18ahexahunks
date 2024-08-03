require('dotenv').config();
const request = require('supertest');
const express = require('express');
const postTwilio = require('../controllers/auth/postTwilio');
const otpModel = require('../models/optModel');
const nodemailer = require('nodemailer');

// Mocking the otpModel and nodemailer
jest.mock('../models/optModel');
jest.mock('nodemailer');

// Set up the Express app
const app = express();
app.use(express.json());
app.post('/post-twilio', postTwilio);

describe('POST /post-twilio', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if OTP record already exists', async () => {
    otpModel.findOne.mockResolvedValue({ email: 'test@example.com', createdAt: new Date() });

    const response = await request(app)
      .post('/post-twilio')
      .send({ toEmail: 'test@example.com' });

    expect(response.status).toBe(400);
    expect(response.text).toBeTruthy();
    expect(otpModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
  });

  it('should send OTP email and return 200 if no OTP record exists', async () => {
    otpModel.findOne.mockResolvedValue(null);
    otpModel.create.mockResolvedValue({});
    
    const sendMailMock = jest.fn().mockResolvedValue('Email sent');
    nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

    const response = await request(app)
      .post('/post-twilio')
      .send({ toEmail: 'newuser@example.com' });

    expect(response.status).toBe(200);
    expect(response.text).toContain('OTP SENT TO newuser@example.com');
    expect(otpModel.findOne).toHaveBeenCalledWith({ email: 'newuser@example.com' });
    expect(otpModel.create).toHaveBeenCalledWith(expect.objectContaining({ email: 'newuser@example.com' }));
    expect(sendMailMock).toHaveBeenCalledWith(expect.objectContaining({
      from: process.env.MY_EMAIL,
      to: 'newuser@example.com',
      subject: 'Your OTP',
    }));
  });

});
