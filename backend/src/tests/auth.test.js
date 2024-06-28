const { MongoClient } = require('mongodb');
const request = require('supertest');
const { app, server } = require('../server'); // Correct path to server
const User = require('../models/User'); // Correct path to User model
const { adminAuthLogin, adminAuthRegister } = require('../authentication'); // Correct path to authentication

describe('Authentication Tests', () => {
  test('Check successful registration', async () => {
    const user = await adminAuthRegister('zhecheng@unsw.edu.au', 'Uzc2312388955', 'Uzc2312388955');
    
    expect(user).toEqual({ 
      email: 'zhecheng@unsw.edu.au',
      password: 'Uzc2312388955',
      "password-check": 'Uzc2312388955'
    });
  }, 30000); // Increase timeout for test

  // Add more tests here...
});
