const User = require('./models/User');
const bcrypt = require('bcrypt');
const connectDB = require('../db');

const jwt = require('jsonwebtoken');
const generateJWTSecret = require('./generateSecret');
require('dotenv').config();

// Ensure the JWT_SECRET exists in the environment variables
if (!process.env.JWT_SECRET) {
    generateJWTSecret();
    require('dotenv').config(); // Reload .env variables
}

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

        const token = jwt.sign(
            { email: user.email, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return {
            token: token,
            user: {
                email: user.email,
                username: user.username
            }
        };
    } catch (error) {
        return { error: "Please try again later" };
    } finally {
        if (client) {
            await client.close();
        }
    }
};

const adminAuthRegister = async (email, username, password, passwordCheck) => {
    if (password !== passwordCheck) {
        return { error: "Passwords do not match" };
    }

    let client;
    try {
        client = await connectDB();
        const db = client.db();

        const existingUserByEmail = await db.collection('users').findOne({ email });
        const existingUserByUsername = await db.collection('users').findOne({ username });

        if (existingUserByEmail) {
            return { error: "Invalid Email" };
        }

        if (existingUserByUsername) {
            return { error: "Invalid Username" };
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const token = jwt.sign(
            { email, username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        await db.collection('users').insertOne({ email, password: hashedPassword, username, token });

        return {
            token: token,
            user: {
                email: email,
                username: username,
                hashedPassword: hashedPassword
            }
        };
    } catch (error) {
        return { error: "Please try again later" };
    } finally {
        if (client) {
            await client.close();
        }
    }
};

const deleteAccount = async (email, password) => {
    let client;
    try {
        client = await connectDB();
        const db = client.db();
        const existingUser = await db.collection('users').findOne({ email });

        if (!existingUser) {
            return { error: "User not found" };
        }

        // Verify the password (assuming plain text comparison for simplicity)
        if (existingUser.password !== password) {
            return { error: "Incorrect password! You have no permission to delete!" };
        }

        const result = await db.collection('users').deleteOne({ email });

        if (result.deletedCount === 0) {
            return { error: "User not found" };
        }

        return { message: "Account deleted successfully" };
    } catch (error) {
        return { error: "Please try again later" };
    } 
};

const resetUsername = async (email, newUsername) => {
    
    let client;
    try {
        client = await connectDB();
        const db = client.db();
        const existingUserFromEmail = await db.collection('users').findOne({ email });
        const existingUserFromUsername = await db.collection('users').findOne({ newUsername });

        if (!existingUserFromEmail) {
            return { error: "User not found" };
        }

        if (existingUserFromUsername) {
            return { error: "Username has existed"}
        }

        await db.collection('users').updateOne(
            { email },
            { $set: { username: newUsername } }
        );

        return { message: "Username updated successfully" };
    } catch (error) {
        return { error: "Please try again later" };
    }
};

const resetPassword = async (emailOrUsername, currentPassword, newPassword) => {
    let client;
    try {
        client = await connectDB();
        const db = client.db();
        const existingUser = await db.collection('users').findOne({
            $or: [
                { email: emailOrUsername },
                { username: emailOrUsername }
            ]
        });

        if (!existingUser) {
            return { error: "User not found" };
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, existingUser.password);
        if (!isPasswordValid) {
            return { error: "Incorrect current password" };
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await db.collection('users').updateOne(
            { _id: existingUser._id },
            { $set: { password: hashedNewPassword } }
        );

        return { message: "Password updated successfully" };
    } catch (error) {
        return { error: "Please try again later" };
    } finally {
        if (client) {
            await client.close();
        }
    }
};

const resetEmail = async (username, password, newEmail) => {
    let client;
    try {
        client = await connectDB();
        const db = client.db();

        // Find if the new email already exists
        const existingUserFromEmail = await db.collection('users').findOne({ email: newEmail });

        if (existingUserFromEmail) {
            return { error: "Email already exists" };
        }

        // Find the user by username
        const existingUserFromUsername = await db.collection('users').findOne({ username: username });

        if (!existingUserFromUsername) {
            return { error: "User not found" };
        }

        // Verify the password
        if (existingUserFromUsername.password !== password) {
            return { error: "Incorrect password" };
        }

        // Update the user's email
        const updateResult = await db.collection('users').updateOne(
            { username },
            { $set: { email: newEmail } }
        );
        return { message: "Email update successful" };
    } catch (error) {
        return { error: "Please try again later" };
    }
};

module.exports = {
    adminAuthLogin,
    adminAuthRegister,
    deleteAccount,
    resetUsername,
    resetPassword,
    resetEmail
};