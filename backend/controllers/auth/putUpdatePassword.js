const User = require('../../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();

const putUpdatePassword = async (req, res) => {
  const { newPassword, 'user-id': userId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(401).json({
      message: "user must be logged in"
    });
  }

  const saltRounds = 10;
  const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

  user.password = hashedNewPassword;
  await user.save()

  return res.status(200).json({
    message: "Password updated successfully"
  });
};

module.exports = putUpdatePassword;
