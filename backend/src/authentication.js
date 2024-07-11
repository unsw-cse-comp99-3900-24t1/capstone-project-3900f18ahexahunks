const bcrypt = require('bcrypt');
const connectDB = require('../db');
const jwt = require('jsonwebtoken');
const path = require('path');

require('dotenv').config();
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const adminAuthLogin = async (email, password) => {
    let client;
    try {
        client = await connectDB();
        const db = client.db();
        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return { error: "Invalid Email or password" };
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return { error: "Invalid Email or password" };
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        await db.collection('users').updateOne(
            { email: user.email },
            { $set: { token: token } }
        );

        return {
            token: token,
            user: {
                email: user.email,
                password: user.password
            }
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
            return { error: "Email already exists" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        await db.collection('users').insertOne({ email, password: hashedPassword, token: token });

        return {
            token: token,
            user: {
                email: email,
                password: hashedPassword
            }
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

const resetUsername = async (email, newUsername) => {
    let client;
    try {
        client = await connectDB();
        const db = client.db();
        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return { error: "Email not found" };
        }

        await db.collection('users').updateOne(
            { email },
            { $set: { username: newUsername } }
        );

        return { success: "Username updated successfully" };
    } catch (error) {
        console.error('Error during username reset:', error);
        return { error: "Please try again later" };
    } finally {
        if (client) {
            await client.close();
        }
    }
};

const deleteAccount = async (email) => {
    let client;
    try {
        client = await connectDB();
        const db = client.db();
        const result = await db.collection('users').deleteOne({ email });

        if (result.deletedCount === 0) {
            return { error: "Account not found" };
        }

        return { success: "Account deleted successfully" };
    } catch (error) {
        console.error('Error during account deletion:', error);
        return { error: "Please try again later" };
    } finally {
        if (client) {
            await client.close();
        }
    }
};

const resetEmail = async (oldEmail, newEmail) => {
    let client;
    try {
        client = await connectDB();
        const db = client.db();
        const user = await db.collection('users').findOne({ email: oldEmail });

        if (!user) {
            return { error: "Email not found" };
        }

        const existingUser = await db.collection('users').findOne({ email: newEmail });
        if (existingUser) {
            return { error: "New email already in use" };
        }

        await db.collection('users').updateOne(
            { email: oldEmail },
            { $set: { email: newEmail } }
        );

        return { success: "Email updated successfully" };
    } catch (error) {
        console.error('Error during email reset:', error);
        return { error: "Please try again later" };
    } finally {
        if (client) {
            await client.close();
        }
    }
};

const forgotPassword = async (email) => {
    let client;
    try {
        client = await connectDB();
        console.log('Connected to database');
        const db = client.db();
        const user = await db.collection('users').findOne({ email });

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000;

        await db.collection('users').updateOne(
            { email },
            { $set: { resetToken, resetTokenExpiry } }
        );

        console.log('Reset token generated:', resetToken);

        return { success: "Password reset token generated", token: resetToken };
    } catch (error) {
        console.error('Error during password reset request:', error);
        return { error: "Please try again later" };
    } finally {
        if (client) {
            await client.close();
        }
    }
};

module.exports = {
    adminAuthLogin,
    adminAuthRegister,
    resetUsername,
    deleteAccount,
    resetEmail,
    forgotPassword
};
