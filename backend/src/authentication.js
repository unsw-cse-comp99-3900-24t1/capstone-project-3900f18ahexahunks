const User = require('./models/User');
//const bcrypt = require('bcrypt');
//const sendInfoToDB = require('./sendInfoToDB');
const connectDB = require('../db');

const jwt = require('jsonwebtoken');
const generateJWTSecret = require('./generateSecret');
require('dotenv').config();

// Ensure the JWT_SECRET exists in the environment variables
if (!process.env.JWT_SECRET) {
    generateJWTSecret();
    require('dotenv').config(); // Reload .env variables
}

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

        // Generate JWT
        const token = jwt.sign(
            { email: user.email, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expiration time
        );
        console.log('Generated JWT token for login');

        // Store the token in the database
        await db.collection('users').updateOne(
            { _id: user._id },
            { $set: { token: token } }
        );
        console.log('Stored JWT token in the database');

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
        console.log('Connected to database');

        const existingUser = await db.collection('users').findOne({ email });
        console.log('Checked for existing user');

        if (existingUser) {
            console.log('Email already exists');
            return { error: "Email already exists" };
        }

        const username = email;

        // Generate JWT
        const token = jwt.sign(
            { email, username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expiration time
        );
        console.log('Generated JWT token');

        await db.collection('users').insertOne({ email, password, username, token });
        console.log('Inserted new user with token');

        return {
            token: token,
            user: {
                email: email,
                password: password,
                username: username
            }
        };
    } catch (error) {
        console.error('Error during registration:', error);
        return { error: "Please try again later" };
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
        console.error('Error during account deletion:', error);
        return { error: "Please try again later" };
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

        // Verify the current password
        if (existingUser.password !== currentPassword) {
            return { error: "Incorrect current password" };
        }

        await db.collection('users').updateOne(
            { emailOrUsername },
            { $set: { password: newPassword } }
        );

        return { message: "Password updated successfully" };
    } catch (error) {
        console.error('Error during username reset:', error);
        return { error: "Please try again later" };
    }
};

const resetEmail = async (username, password, newEmail) => {
    let client;
    try {
        client = await connectDB();
        const db = client.db();
        console.log('Connected to database');

        // Find if the new email already exists
        const existingUserFromEmail = await db.collection('users').findOne({ email: newEmail });
        console.log('Existing user from email:', existingUserFromEmail);

        if (existingUserFromEmail) {
            console.log('Email already exists');
            return { error: "Email already exists" };
        }

        // Find the user by username
        const existingUserFromUsername = await db.collection('users').findOne({ username: username });
        console.log('Existing user from username:', existingUserFromUsername);

        if (!existingUserFromUsername) {
            console.log('User not found');
            return { error: "User not found" };
        }

        // Verify the password
        if (existingUserFromUsername.password !== password) {
            console.log('Incorrect password');
            return { error: "Incorrect password" };
        }

        // Update the user's email
        const updateResult = await db.collection('users').updateOne(
            { username },
            { $set: { email: newEmail } }
        );
        console.log('Update result:', updateResult);

        console.log('Email update successful');
        return { message: "Email update successful" };
    } catch (error) {
        console.error('Error during email reset:', error);
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