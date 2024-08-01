const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const postRegister = async (req, res) => {
  console.log('hiiii');
  let { email, username, password, passwordCheck } = req.body;

  if (password !== passwordCheck) {
    return res.status(402).json({
      message: 'Passwords do not match',
    });
  } else if (!/^[a-zA-Z ]*$/.test(username)) {
    return res.status(400).json({
      message: 'Invalid Username',
    });
  } else if (password.length < 8) {
    return res.status(400).json({
      message: 'Invalid password',
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'The user with the provided email already exists',
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Generate JWT
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    savedUser.token = token;
    await savedUser.save();

    // Set token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    }); // Set cookie for 1 hour

    return res.status(200).json({
      email: email,
      googlePicture: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png',
      username: username,
      _id: savedUser._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Please try again later',
    });
  }
};

module.exports = postRegister;
