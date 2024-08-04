const User = require('../../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();

// This function implements user login by verifying the email and password provided by the user.
const postLogin = async (req, res) => {
  try {
    // Extracts 'email' and 'password' from the request body.
    const { email, password } = req.body;

    // Searches the database for a user with the provided email.
    const user = await User.findOne({ email });
    if (!user) {
      // If the user is not found, respond with a 401 status and an "Invalid email or password" message.
      return res.status(401).json({
          message: "Invalid email or password"
      });
    }

    // Compares the provided password with the stored hashed password.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // If the passwords do not match, respond with a 401 status and an "Invalid email or password" message.
      return res.status(401).json({
          message: "Invalid email or password"
      });
    }

    // If the login is successful, respond with a 200 status and return user details.
    return res.status(200).json({
      email: user.email,
      googlePicture: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png", // Placeholder for user's Google profile picture.
      username: user.username,
      _id: user._id
    });
  } catch (error) {
    // Prints any errors and responds with a 500 status and error message.
    console.error(error);
    return res.status(500).json({
      message: "Please try again later"
    });
  }
};
// Exports the postLogin function for use in 'authController'.
module.exports = postLogin;
