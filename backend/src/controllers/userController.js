const User = require('../models/User');

exports.updatePassword = async (req, res) => {
  const { newPassword, userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).send('Unauthorized, user must be logged in');
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.send('Password updated successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error, please try again later');
  }
};
