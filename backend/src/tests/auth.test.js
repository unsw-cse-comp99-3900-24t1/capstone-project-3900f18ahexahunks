const { MongoClient } = require('mongodb');
const request = require('supertest');
const { app, server } = require('../server');
const User = require('../models/User');
const { adminAuthLogin, adminAuthRegister, deleteAccount, resetUsername, resetPassword, resetEmail } = require('../authentication');

describe('Authentication Tests', () => {
  test('Check successful registration', async () => {
    const response = await adminAuthRegister('zhecheng456@unsw.edu.au', 'Yzc132', 'Yzc132');

    console.log('Test user registration response:', response);

    // Check if token is present and is a string
    expect(response).toHaveProperty('token');
    expect(typeof response.token).toBe('string');

    // Check if user object is correct
    expect(response).toMatchObject({
        user: {
            email: 'zhecheng456@unsw.edu.au',
            password: 'Yzc132',
            username: 'zhecheng456@unsw.edu.au'
        }
    });
  }, 3000);

  test('Wrong password registration', async () => {
    const user = await adminAuthRegister('yzc@unsw.edu.au', 'Uzc2312388955', '666');
    
    expect(user).toEqual({ error: "Passwords do not match" });
  }, 3000);

  test('Successful login with correct credentials', async () => {
    await adminAuthRegister('zhecheng456@unsw.edu.au', 'Yzc132', 'Yzc132');
  
    const response = await adminAuthLogin('zhecheng456@unsw.edu.au', 'Yzc132');
    
    console.log('Login response:', response);

    // Check if token is present and is a string
    expect(response).toHaveProperty('token');
    expect(typeof response.token).toBe('string');

    // Check if user object is correct
    expect(response).toMatchObject({
        user: {
            email: 'zhecheng456@unsw.edu.au',
            password: 'Yzc132'
        }
    });
  }, 30000);

  test('Login attempt with incorrect email', async () => {
    const response = await adminAuthLogin('wrong@example.com', 'Test@123');
    expect(response).toEqual({ error: "Invalid Email or password" });
  }, 30000);

  test('Successful username reset', async () => {
    // First, register a user
    await adminAuthRegister('user@unsw.edu.au', 'password123', 'password123');

    // Then, reset the username
    const response = await resetUsername('user@unsw.edu.au', 'newusername');
    expect(response).toEqual({ message: "Username updated successfully" });

  }, 30000);

  test('Attempt to reset username for non-existent user', async () => {
    const response = await resetUsername('nonexistent@user.com', 'newusername');
    expect(response).toEqual({ error: "User not found" });
  }, 30000);

  test('Successful in reset password', async () => {
      await adminAuthRegister('zhecheng666666666@unsw.edu.au', 'password123', 'password123');
      await adminAuthLogin('zhecheng666666666@unsw.edu.au', 'password123');

      const response = await resetPassword('zhecheng666666666@unsw.edu.au', 'password123', 'Yzc66666666');
      expect(response).toEqual({ message: "Password updated successfully" });
  }, 30000);

  test('Failed in reset password', async () => {
    await adminAuthRegister('zhecheng666666666@unsw.edu.au', 'password123', 'password123');
    await adminAuthLogin('zhecheng666666666@unsw.edu.au', 'password123');

    const response = await resetPassword('zhecheng666666666@unsw.edu.au', 'wrongpassword', 'Yzc66666666');
    expect(response).toEqual({ error: "Incorrect current password" });
  }, 30000);

  test('Successful account deletion with correct email and password', async () => {
    // Register a user
    const email = 'delete@user.com';
    const password = 'delete123';
    await adminAuthRegister(email, password, password);

    // Delete the account
    const response = await deleteAccount(email, password);
    expect(response).toEqual({ message: "Account deleted successfully" });
  }, 30000);

  test('Reset email', async () => {
    // Register a user
    const email = 'olduser@user.com';
    const password = 'olduser123';
    await adminAuthRegister(email, password, password);

    // Reset the email
    const response = await resetEmail(email, password, 'newemail@olduser.com');
    expect(response).toEqual({ message: "Email update successful" });
  }, 30000);

});
