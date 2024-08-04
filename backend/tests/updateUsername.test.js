const putUpdateUsername = require('../controllers/auth/putUpdateUsername');
const User = require('../models/user');
const bcrypt = require('bcrypt');

jest.mock('../models/user');
jest.mock('bcrypt');

describe('putUpdateUsername', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        newUsername: 'NewUsername',
        'user-id': 'user123',
        password: 'password123',
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

  test('should respond with 401 and "User must be logged in" when user is not found', async () => {
    User.findById.mockResolvedValue(null);

    await putUpdateUsername(req, res);

    expect(User.findById).toHaveBeenCalledWith('user123');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "User must be logged in",
    });
  });

  test('should respond with 400 and "Invalid password" when the password does not match', async () => {
    const mockUser = { _id: 'user123', username: 'OldUsername', password: 'hashedPassword' };
    User.findById.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    await putUpdateUsername(req, res);

    expect(User.findById).toHaveBeenCalledWith('user123');
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid password",
    });
  });

  test('should respond with 400 and "Invalid Username" when the new username contains invalid characters', async () => {
    const mockUser = { _id: 'user123', username: 'OldUsername', password: 'hashedPassword' };
    User.findById.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);

    req.body.newUsername = 'Invalid@Username';

    await putUpdateUsername(req, res);

    expect(User.findById).toHaveBeenCalledWith('user123');
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid Username",
    });
  });

  test('should update username and respond with 200 and "Username updated successfully"', async () => {
    const mockUser = {
      _id: 'user123',
      username: 'OldUsername',
      password: 'hashedPassword',
      save: jest.fn().mockResolvedValue(true),
    };
    User.findById.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);

    await putUpdateUsername(req, res);

    expect(User.findById).toHaveBeenCalledWith('user123');
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(mockUser.username).toBe('NewUsername');
    expect(mockUser.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Username updated successfully",
    });
  });

  test('should respond with 500 and "Please try again later" if an error occurs', async () => {
    User.findById.mockRejectedValue(new Error('Database error'));

    await putUpdateUsername(req, res);

    expect(User.findById).toHaveBeenCalledWith('user123');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please try again later",
    });
  });
});
