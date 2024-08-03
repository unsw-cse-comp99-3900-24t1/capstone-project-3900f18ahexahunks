const verifyOtp = require('../controllers/auth/verifyOpt');
const otpModel = require('../models/optModel');

jest.mock('../models/optModel');

describe('verifyOtp', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        toEmail: 'test@example.com',
        otp: '123456',
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should respond with 403 and false when OTP record is not found', async () => {
    otpModel.findOne.mockResolvedValue(null);

    await verifyOtp(req, res);

    expect(otpModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith(false);
  });

  test('should respond with 403 and false when OTP does not match', async () => {
    otpModel.findOne.mockResolvedValue({ email: 'test@example.com', otp: '654321' });

    await verifyOtp(req, res);

    expect(otpModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith(false);
  });

  test('should respond with 200 and true when OTP matches', async () => {
    otpModel.findOne.mockResolvedValue({ email: 'test@example.com', otp: '123456' });

    await verifyOtp(req, res);

    expect(otpModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(true);
  });
});
