const User = require('../../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();

// This function implements the process of updating a user's username.
const putUpdateUsername = async (req, res) => {
  // Extracts 'newUsername', 'user-id', and 'password' from the request body.
  const { newUsername, 'user-id': userId, password } = req.body;

  try {
    // Finds the user in the database by the userID.
    const user = await User.findById(userId);
    if (!user) {
      // If the user is not found, respond with a 401 status and a "User must be logged in" message.
      return res.status(401).json({
        message: "User must be logged in"
      });
    }

    // Verifies the user's password by comparing the provided password with the stored hashed password.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // If the password is incorrect, respond with a 400 status and an "Invalid password" message.
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // Checks if the new username is valid (only letters and spaces are allowed).
    if (!/^[a-zA-Z ]*$/.test(newUsername)) {
      // If the username contains invalid characters, respond with a 400 status and an "Invalid Username" message.
      return res.status(400).json({
        message: "Invalid Username"
      });
    }

    // Updates the user's username with the new username.
    user.username = newUsername;
    await user.save();

    // Responds with a 200 status and a success message.
    return res.status(200).json({
      message: "Username updated successfully"
    });
  } catch (error) {
    // Catches and logs any errors that occur during the process.
    return res.status(500).json({
      message: "Please try again later"
    });
  }
};

// Exports the putUpdateUsername function for use in 'authController'.
module.exports = putUpdateUsername;
