const request = require('supertest');
const { app, server } = require('../server');
const mongoose = require('mongoose');

describe('POST/register', () => {

  beforeAll(async () => {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    // Close the database connection
    await mongoose.connection.close();
    await server.close();
  });

  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        email: 'test1@example.com',
        username: 'testuser',
        password: 'password123',
        passwordCheck: 'password123'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('email', 'test1@example.com');
    expect(res.body).toHaveProperty('username', 'testuser');
  });

  it('should not register a user with mismatched passwords', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        email: 'test4@example.com',
        username: 'testuser',
        password: 'password123',
        passwordCheck: 'password456'
      });

    expect(res.statusCode).toEqual(402);
    expect(res.body).toHaveProperty('message', 'Passwords do not match');
  });

  it('should not register a user with an invalid username', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        email: 'test@example.com',
        username: 'invalid@user',
        password: 'password123',
        passwordCheck: 'password123'
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Invalid Username');
  });

  it('should not register a user with an existing email', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        email: 'test1@example.com',
        username: 'newuser',
        password: 'password123',
        passwordCheck: 'password123'
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'The user with the provided email already exists');
  });

  it('should not register a user with a password shorter than 8 characters', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'short',
        passwordCheck: 'short'
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Invalid password');
  });
});
