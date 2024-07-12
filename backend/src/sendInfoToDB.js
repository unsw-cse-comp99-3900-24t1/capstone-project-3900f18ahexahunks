// This code implements an asynchronous function that saves user information to a MongoDB database.
const connectDB = require('../db');

const sendInfoToDB = async (email, password) => {
    let client;
    try {
        // Connect to the database
        client = await connectDB();
        const db = client.db();
        const usersCollection = db.collection('users');

        // Log the user data before saving
        console.log('Attempting to save user:', { email, password });

        // Insert the user into the database
        const result = await usersCollection.insertOne({ email, password });

        // Log and return the inserted document
        console.log('User saved successfully:', result.ops ? result.ops[0] : result);

        // Return the inserted document, handling both cases: ops present or not
        return result.ops ? result.ops[0] : {
            email,
            password,
            _id: result.insertedId
        };
    } catch (error) {
        console.error('Error saving user:', error);
        throw error;
    } finally {
        if (client) {
            await client.close();
        }
    }
};

module.exports = sendInfoToDB;
