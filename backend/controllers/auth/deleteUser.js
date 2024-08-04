const User = require('../../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();

// This function implements the deletion of a user account.
const deleteUser = async (req, res) => {
  try {
    // Extracts 'username' and 'password' from the request body.
    const { username, password } = req.body;
	
    // Searches the database for a user with the provided username.
    const user = await User.findOne({ username: username });
    if (!user) {
      // If the user is not found, respond with a 400 status and message.
      return res.status(400).json({
        message: "User not found"
      });
    }

    // Compares the provided password with the stored hashed password.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // If the passwords do not match, respond with a 400 status and message.
      return res.status(400).json({
        message: "Invalid username or password"
      });
    }

    // Deletes the user from the database if the password matches.
    await User.deleteOne({ username: username });

    // Responds with a 200 status and success message upon successful deletion.
    return res.status(200).json({
      message: "Account deleted successfully"
    });
  } catch (error) {
    // Prints any errors and responds with a 500 status and error message.
    console.error(error);
    return res.status(500).json({
      message: "Please try again later"
    });
  }
};

// Exports the deleteUser function for use in 'authController'.
module.exports = deleteUser;
