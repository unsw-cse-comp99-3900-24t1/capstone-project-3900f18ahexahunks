const putUpdatePassword = require('../controllers/auth/putUpdatePassword');
const User = require('../models/user');
const bcrypt = require('bcrypt');

jest.mock('../models/user');
jest.mock('bcrypt');

describe('putUpdatePassword', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        newPassword: 'newPassword123',
        'user-id': 'user123',
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should respond with 401 and "user must be logged in" when user is not found', async () => {
    User.findById.mockResolvedValue(null);

    await putUpdatePassword(req, res);

    expect(User.findById).toHaveBeenCalledWith('user123');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "user must be logged in",
    });
  });

  test('should hash the new password and update the user\'s password', async () => {
    const mockUser = {
      _id: 'user123',
      password: 'oldPasswordHash',
      save: jest.fn().mockResolvedValue(true),
    };
    User.findById.mockResolvedValue(mockUser);
    bcrypt.hash.mockResolvedValue('hashedNewPassword123');

    await putUpdatePassword(req, res);

    expect(User.findById).toHaveBeenCalledWith('user123');
    expect(bcrypt.hash).toHaveBeenCalledWith('newPassword123', 10);
    expect(mockUser.password).toBe('hashedNewPassword123');
    expect(mockUser.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Password updated successfully",
    });
  });

});
