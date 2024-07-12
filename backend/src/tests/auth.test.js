const { MongoClient } = require('mongodb');
const request = require('supertest');
const { app, server } = require('../server');
const User = require('../models/User');
const { adminAuthLogin, adminAuthRegister, deleteAccount, resetUsername, resetPassword, resetEmail } = require('../authentication');

describe('Authentication Tests', () => {
  test('Check successful registration', async () => {
    const user = await adminAuthRegister('zhecheng456@unsw.edu.au', 'Yzc132', 'Yzc132');
    
    expect(user).toEqual({ 
      email: 'zhecheng456@unsw.edu.au',
      password: 'Yzc132',
      username: 'zhecheng456@unsw.edu.au'
    });
  }, 3000);

  test('Wrong password registration', async () => {
    const user = await adminAuthRegister('yzc@unsw.edu.au', 'Uzc2312388955', '666');
    
    expect(user).toEqual({ error: "Passwords do not match" });
  }, 3000);

  test('Successful login with correct credentials', async () => {
    await adminAuthRegister('zhecheng456@unsw.edu.au', 'Yzc132', 'Yzc132');
  
    const response = await adminAuthLogin('zhecheng456@unsw.edu.au', 'Yzc132');
    expect(response).toEqual({ 
      email: 'zhecheng456@unsw.edu.au',
      password: 'Yzc132'
     });
  }, 30000);

  test('Login attempt with incorrect email', async () => {
    const response = await adminAuthLogin('wrong@example.com', 'Test@123');
    expect(response).toEqual({ error: "Invalid Email or password" });
  }, 30000);

  test('Successful account deletion', async () => {
    // First, register a user
    await adminAuthRegister('delete@user.com', 'delete123', 'delete123');

    // Then, delete the account
    const response = await deleteAccount('delete@user.com');
    expect(response).toEqual({ message: "Account deleted successfully" });
  }, 30000);

  test('Attempt to delete a non-existent account', async () => {
    const response = await deleteAccount('nonexistent@user.com');
    expect(response).toEqual({ error: "User not found" });
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

      const response = await resetPassword('zhecheng666666666@unsw.edu.au', 'Yzc66666666');
      expect(response).toEqual({ message: "Password updated successfully" });

  }, 30000);

  test('Successful in reset email', async () => {
    await adminAuthRegister('zhecheng@unsw.edu.au', 'password123', 'password123');

    const response = await resetEmail('zhecheng@unsw.edu.au', 'newemail666@gmail.com');
    expect(response).toEqual({ message: "Email updated successfully" });
  }, 30000);
});
