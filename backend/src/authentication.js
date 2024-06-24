const User = require('./models/user');
const bcrypt = require('bcrypt');

// Define the adminAuthLogin function
async function adminAuthLogin(email, password) {
  try {
      const user = await User.findOne({ email });

      if (!user) {
          return { error: "Invalid Email or password" };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return { error: "Invalid Email or password" };
      }

      return {
          email: user.email,
          password: password
      };
  } catch (error) {
      console.error('Error during login:', error);
      return { error: "Please try again later" };
  }
}

async function adminAuthRegister(userName, email, password, passwordCheck) {
    try {
        if (password !== passwordCheck) {
            return { error: "Passwords do not match" };
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return { error: "Email already registered" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            passwordCheck: hashedPassword  // Ensure passwordCheck is the same as the hashed password
        });

        await newUser.save();

        return {
            email: newUser.email,
            password: password,  // Return plain password
            passwordCheck: passwordCheck  // Return plain passwordCheck
        };
    } catch (error) {
        console.error('Error during registration:', error);
        return { error: "Please try again later" };
    }
}

module.exports = {
    adminAuthLogin,
    adminAuthRegister
};

