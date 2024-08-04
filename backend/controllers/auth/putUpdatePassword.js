const User = require('../../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();

// This function implements the process of updating a user's password.
const putUpdatePassword = async (req, res) => {
  // Extracts 'newPassword' and 'user-id' from the request body.
  const { newPassword, 'user-id': userId } = req.body;

  // Finds the user in the database by the userID.
  const user = await User.findById(userId);
  if (!user) {
    // If the user is not found, respond with a 401 status and a "user must be logged in" message.
    return res.status(401).json({
      message: "user must be logged in"
    });
  }

  // Hashes the new password using bcrypt.
  const saltRounds = 10;
  const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

  // Updates the user's password with the new hashed password.
  user.password = hashedNewPassword;
  await user.save()

  // Responds with a 200 status and a success message.
  return res.status(200).json({
    message: "Password updated successfully"
  });
};

// Exports the putUpdatePassword function for use in 'authController'.
module.exports = putUpdatePassword;
