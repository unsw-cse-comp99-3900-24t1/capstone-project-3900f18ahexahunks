const { MongoClient } = require('mongodb');
const request = require('supertest');
const { app, server } = require('../server');
const User = require('../models/User');
const { adminAuthLogin, adminAuthRegister, resetUsername, deleteAccount, resetEmail } = require('../authentication');

describe('Authentication Tests', () => {
  beforeAll(async () => {
    const client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db();
    await db.collection('users').deleteMany({});
    await client.close();
  });

  test('Check successful registration', async () => {
    const response = await adminAuthRegister('zhecheng@unsw.edu.au', 'Yzc132', 'Yzc132');
    
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual({
        email: 'zhecheng@unsw.edu.au',
        password: expect.any(String)
    });

    const client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db();
    const user = await db.collection('users').findOne({ email: 'zhecheng@unsw.edu.au' });
    expect(user).toHaveProperty('token', response.token);
    await client.close();
  }, 3000);

  test('Wrong password registration', async () => {
    const user = await adminAuthRegister('yzc@unsw.edu.au', 'Uzc2312388955', '666');
    
    expect(user).toEqual({ error: "Passwords do not match" });
  }, 3000);

  test('Successful login with correct credentials', async () => {
    await adminAuthRegister('loginuser@unsw.edu.au', 'password123', 'password123');

    const response = await adminAuthLogin('loginuser@unsw.edu.au', 'password123');

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual({
        email: 'loginuser@unsw.edu.au',
        password: expect.any(String)
    });

    const client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db();
    const user = await db.collection('users').findOne({ email: 'loginuser@unsw.edu.au' });
    expect(user).toHaveProperty('token', response.token);
    await client.close();
  }, 30000);

  test('Login attempt with incorrect email', async () => {
    const response = await adminAuthLogin('wrong@example.com', 'Test@123');
    expect(response).toEqual({ error: "Invalid Email or password" });
  }, 30000);

  test('Successful username reset', async () => {
    await adminAuthRegister('testuser@unsw.edu.au', 'password123', 'password123');

    const response = await resetUsername('testuser@unsw.edu.au', 'newUsername');
    expect(response).toEqual({ success: "Username updated successfully" });

  }, 30000);

  test('Username reset for non-existing email', async () => {
    const response = await resetUsername('nonexisting@unsw.edu.au', 'newUsername');
    expect(response).toEqual({ error: "Email not found" });
  }, 30000);

  test('Successful account deletion', async () => {
    await adminAuthRegister('deletetest@unsw.edu.au', 'password123', 'password123');

    const response = await deleteAccount('deletetest@unsw.edu.au');
    expect(response).toEqual({ success: "Account deleted successfully" });

  }, 30000);

  test('Account deletion for non-existing email', async () => {
    const response = await deleteAccount('nonexisting@unsw.edu.au');
    expect(response).toEqual({ error: "Account not found" });
  }, 30000);

  test('Successful email reset', async () => {
    await adminAuthRegister('oldemail@unsw.edu.au', 'password123', 'password123');

    const response = await resetEmail('oldemail@unsw.edu.au', 'newemail@unsw.edu.au');
    expect(response).toEqual({ success: "Email updated successfully" });

  }, 30000);

  test('Email reset for non-existing email', async () => {
    const response = await resetEmail('nonexisting@unsw.edu.au', 'newemail@unsw.edu.au');
    expect(response).toEqual({ error: "Email not found" });
  }, 30000);

  test('Email reset with new email already in use', async () => {
    await adminAuthRegister('user1@unsw.edu.au', 'password123', 'password123');
    await adminAuthRegister('user2@unsw.edu.au', 'password123', 'password123');

    const response = await resetEmail('user1@unsw.edu.au', 'user2@unsw.edu.au');
    expect(response).toEqual({ error: "New email already in use" });
  }, 30000);
});
