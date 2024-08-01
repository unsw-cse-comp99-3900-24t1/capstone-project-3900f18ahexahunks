const User = require('../../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
          message: "Invalid email or password"
      });
    }

    return res.status(200).json({
      email: user.email,
      googlePicture: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      username: user.username,
      _id: user._id
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Please try again later"
    });
  }
};

module.exports = postLogin;
