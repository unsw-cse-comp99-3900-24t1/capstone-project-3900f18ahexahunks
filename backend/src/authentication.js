const User = require('./models/User');
const bcrypt = require('bcrypt');
const sendInfoToDB = require('./sendInfoToDB');
const connectDB = require('../db');

const adminAuthLogin = async (email, password) => {
    let client;
    try {
        client = await connectDB();
        const db = client.db();
        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return { error: "Invalid Email or password" };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { error: "Invalid Email or password" };
        }

        return {
            email: user.email,
            userName: user.userName
        };
    } catch (error) {
        console.error('Error during login:', error);
        return { error: "Please try again later" };
    } finally {
        if (client) {
            await client.close();
        }
    }
};

const adminAuthRegister = async (email, password, passwordCheck) => {
    if (password !== passwordCheck) {
        return { error: "Passwords do not match" };
    }

    let client;
    try {
        client = await connectDB();
        const db = client.db();
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return { error: "Email already registered" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.collection('users').insertOne({ email, password: hashedPassword });

        return {
            email: email,
            password: password,
            "password-check": passwordCheck
        };
    } catch (error) {
        console.error('Error during registration:', error);
        return { error: "Please try again later" };
    } finally {
        if (client) {
            await client.close();
        }
    }
};

module.exports = {
    adminAuthLogin,
    adminAuthRegister
};

