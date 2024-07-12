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

        // send the info to mongoDB
        sendInfoToDB(email, password);

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

const resetEmail = async (currentEmail, newEmail) => {
    let client;
    try {
        client = await connectDB();
        const db = client.db();
        const existingUser = await db.collection('users').findOne({ email: currentEmail });

        if (!existingUser) {
            return { error: "User not found" };
        }

        await db.collection('users').updateOne(
            { email: currentEmail },
            { $set: { email: newEmail } }
        );

        return { message: "Email updated successfully" };
    } catch (error) {
        console.error('Error during email reset:', error);
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
        const existingUser = await db.collection('users').findOne({ email });

        if (!existingUser) {
            return { error: "User not found" };
        }

        await db.collection('users').updateOne(
            { email },
            { $set: { username: newUsername } }
        );

        return { message: "Username updated successfully" };
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
        const existingUser = await db.collection('users').findOne({ email });

        if (!existingUser) {
            return { error: "User not found" };
        }

        await db.collection('users').deleteOne({ email });

        return { message: "Account deleted successfully" };
    } catch (error) {
        console.error('Error during account deletion:', error);
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
    resetEmail,
    resetUsername,
    deleteAccount
};
