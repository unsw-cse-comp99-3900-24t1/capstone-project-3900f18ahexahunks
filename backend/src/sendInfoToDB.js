const connectDB = require('../db');

const sendInfoToDB = async (userName, email, password) => {
    let client;
    try {
        // Connect to the database
        client = await connectDB();
        const db = client.db();
        const usersCollection = db.collection('users');

        // Log the user data before saving
        console.log('Attempting to save user:', { userName, email, password });

        // Insert the user into the database
        const result = await usersCollection.insertOne({ userName, email, password });

        // Log and return the inserted document
        console.log('User saved successfully:', result.ops ? result.ops[0] : result);

        // Return the inserted document, handling both cases: ops present or not
        return result.ops ? result.ops[0] : {
            userName,
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
