const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// This function implements user registration by creating a new user account in the system.
const postRegister = async (req, res) => {
  // Extracts 'email', 'username', 'password', and 'passwordCheck' from the request body.
  let { email, username, password, passwordCheck } = req.body;

  if (password !== passwordCheck) {
    // Passwords must match.
    return res.status(402).json({
      message: "Passwords do not match"
    });
  } else if (!/^[a-zA-Z ]*$/.test(username)) {
    // The 'username' only contains alphabetic characters (both uppercase and lowercase) and spaces,
    // otherwise it will respond with a 400 status and a message.
    return res.status(400).json({
      message: "Invalid Username"
    });
  } else if (password.length < 8) {
    // If the password is less than 8 characters long, respond with a 400 status and a message.
    return res.status(400).json({
      message: "Invalid password"
    });
  }

  try {
    // Checks if a user with the provided email already exists in the database.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If a user with the email exists, respond with a 400 status and a message.
      return res.status(400).json({
        message: "The user with the provided email already exists"
      });
    }

    // Hashes the user's password with bcrypt.
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Creates a new User object with the provided data and the hashed password.
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Saves the new user to the database.
    const savedUser = await newUser.save();

    // Generates a JWT (JSON Web Token) for the user.
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Saves the generated token to the database.
    savedUser.token = token;
    await savedUser.save();

    // Sets the JWT in an HTTP-only and secure cookie with a 1-hour expiration.
    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 });

    // Responds with a 200 status and the new user's details upon successful registration.
    return res.status(200).json({
      email: email,
      googlePicture: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png", // Placeholder for user's Google profile picture.
      username: username,
      _id: savedUser._id
    });
  } catch (error) {
    // Prints any errors and responds with a 500 status and error message.
    console.error(error);
    return res.status(500).json({
      message: "Please try again later"
    });
  }
};

// Exports the postRegister function for use in 'authController'.
module.exports = postRegister;
