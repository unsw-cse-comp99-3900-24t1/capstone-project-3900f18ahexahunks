const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send('Invalid Email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send('Invalid Email or password');
    }

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
    user.token = token;
    await user.save();

    res.json({ token, user: { email: user.email, password: user.password } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Please try again later');
  }
};

exports.register = async (req, res) => {
  const { email, password, passwordCheck } = req.body;

  if (password !== passwordCheck) {
    return res.status(402).send('Passwords do not match');
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).send('User already exists');
    }

    user = new User({
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
    user.token = token;
    await user.save();

    res.json({ token, user: { email: user.email, password: user.password } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Please try again later');
  }
};
