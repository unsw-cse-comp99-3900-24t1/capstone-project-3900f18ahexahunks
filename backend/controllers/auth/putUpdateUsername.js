const User = require('../../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();

const putUpdateUsername = async (req, res) => {
  const { newUsername, 'user-id': userId, password } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        message: "User must be logged in"
      });
    }

    // Verify the user's password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // Check for valid new username
    if (!/^[a-zA-Z ]*$/.test(newUsername)) {
      return res.status(400).json({
        message: "Invalid Username"
      });
    }

    // Update the username
    user.username = newUsername;
    await user.save();

    return res.status(200).json({
      message: "Username updated successfully"
    });
  } catch (error) {
      return res.status(500).json({
        message: "Please try again later"
      });
    }
};

module.exports = putUpdateUsername;
