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

        if (password !== user.password) {
            return { error: "Invalid Email or password" };
        }

        return {
            email: user.email,
            password: user.password
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

        const result = await db.collection('users').insertOne({ email, password: password });

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

module.exports = {
    adminAuthLogin,
    adminAuthRegister,
    resetUsername,
    deleteAccount,
    resetEmail
};