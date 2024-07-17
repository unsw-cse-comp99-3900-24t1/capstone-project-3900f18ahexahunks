const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateJWTSecret = require('./generateSecret');
require('dotenv').config();

if (!process.env.JWT_SECRET) {
    generateJWTSecret();
    require('dotenv').config();
}

const postRegister = async (req, res) => {
    try {
        const { username, password, email, passwordCheck } = req.body;

        let checkUser = await User.exists({ email });
        if (checkUser) {
            return res.status(400).send("Duplicated email");
        }

        let checkUsername = await User.exists({ username });
        if (checkUsername) {
            return res.status(400).send("Duplicated username");
        }

        if (password !== passwordCheck) {
            return res.status(402).send("Passwords do not match");
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({ username, email, password: hashedPassword });

        const token = jwt.sign({ email, username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('authToken', token, {
            httpOnly: true,
            maxAge: 3600000
        });

        return res.status(201).json({ username: user.username, email: user.email, token });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = postRegister;
