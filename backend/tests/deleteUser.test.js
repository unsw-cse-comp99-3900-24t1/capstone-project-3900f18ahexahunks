const request = require('supertest');
const { app, server } = require('../server');
const mongoose = require('mongoose');

describe('DELETE /delete', () => {

  beforeAll(async () => {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    mongoose.connection.close()
    await server.close();
  });

  it('should delete the user successfully with valid username and password', async () => {
    // First, register a new user
    await request(app)
      .post('/register')
      .send({
        email: 'theEmail@example.com',
        username: 'theUserNameOne',
        password: 'password123333',
        passwordCheck: 'password123333'
      });

    // Now, attempt to delete the user with the correct username and password
    const res = await request(app)
      .delete('/delete')
      .send({
        username: 'theUserNameOne',
        password: 'password123333'
      });

    // Assertions
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Account deleted successfully');
  });

  it('should not delete the user with an incorrect password', async () => {
    // Register a user first
    await request(app)
      .post('/register')
      .send({
        email: 'test1@example.com',
        username: 'testuser',
        password: 'password123',
        passwordCheck: 'password123'
      });

    // Attempt to delete the user with an incorrect password
    const res = await request(app)
      .delete('/delete')
      .send({
        username: 'testuser',
        password: 'wrongpassword'
      });

    // Assertions
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Invalid username or password');
  });

  it('should not delete a non-existent user', async () => {
    // Attempt to delete a user that doesn't exist
    const res = await request(app)
      .delete('/delete')
      .send({
        username: 'nonexistentuser',
        password: 'password123'
      });

    // Assertions
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'User not found');
  });

});
