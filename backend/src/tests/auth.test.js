const { MongoClient } = require('mongodb');
const request = require('supertest');
const { app, server } = require('../server');
const User = require('../models/User');
const { adminAuthLogin, adminAuthRegister } = require('../authentication');

describe('Authentication Tests', () => {
  test('Check successful registration', async () => {
    const user = await adminAuthRegister('zhecheng@unsw.edu.au', 'Yzc132', 'Yzc132');
    
    expect(user).toEqual({ 
      email: 'zhecheng@unsw.edu.au',
      password: 'Yzc132',
      "password-check": 'Yzc132'
    });
  }, 3000);

  test('Wrong password registration', async () => {
    const user = await adminAuthRegister('yzc@unsw.edu.au', 'Uzc2312388955', '666');
    
    expect(user).toEqual({ error: "Passwords do not match" });
  }, 3000);

  test('Successful login with correct credentials', async () => {
    const response = await adminAuthLogin('zhecheng@unsw.edu.au', 'Yzc132');
    expect(response).toEqual({ 
      email: 'zhecheng@unsw.edu.au',
      password: 'Yzc132'
     });
  }, 30000);

  test('Login attempt with incorrect email', async () => {
    const response = await adminAuthLogin('wrong@example.com', 'Test@123');
    expect(response).toEqual({ error: "Invalid Email or password" });
  }, 30000);
});
