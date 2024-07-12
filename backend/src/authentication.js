const User = require('./models/User');
const bcrypt = require('bcrypt');
const sendInfoToDB = require('./sendInfoToDB');
const connectDB = require('../db');

const adminAuthLogin = async (emailOrUsername, password) => {
    let client;
    try {
        client = await connectDB();
        const db = client.db();
        const user = await db.collection('users').findOne({
            $or: [
                { email: emailOrUsername },
                { username: emailOrUsername }
            ]
        });
        
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

       const username = email;
       await db.collection('users').insertOne({ email, password, username });

        return {
            email: email,
            password: password,
            username: email
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

const deleteAccount = async (email) => {
    // add account verification

    let client;
    try {
        client = await connectDB();
        const db = client.db();
        const result = await db.collection('users').deleteOne({ email });

        if (result.deletedCount === 0) {
            return { error: "User not found" };
        }

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

const resetUsername = async (email, newUsername) => {
    // add account verification
    
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
        console.error('Error during username reset:', error);
        return { error: "Please try again later" };
    } finally {
        if (client) {
            await client.close();
        }
    }
};

const resetPassword = async (emailOrUsername, newPassword) => {
    // add account verification
    
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

        await db.collection('users').updateOne(
            { emailOrUsername },
            { $set: { password: newPassword } }
        );

        return { message: "Password updated successfully" };
    } catch (error) {
        console.error('Error during username reset:', error);
        return { error: "Please try again later" };
    } finally {
        if (client) {
            await client.close();
        }
    }
};

const resetEmail = async (username, newEmail) => {
    // add account verification
    
    let client;
    try {
        client = await connectDB();
        const db = client.db();
        const existingUserFromEmail = await db.collection('users').findOne({ newEmail });
        const existingUserFromUsername = await db.collection('users').findOne({ username });

        if (!existingUserFromUsername) {
            return { error: "User not found" };
        }

        if (existingUserFromEmail) {
            return { error: "Email has existed"}
        }

        await db.collection('users').updateOne(
            { username },
            { $set: { email: newEmail } }
        );

        return { message: "Email updated successfully" };
    } catch (error) {
        console.error('Error during username reset:', error);
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
    deleteAccount,
    resetUsername,
    resetPassword,
    resetEmail
};