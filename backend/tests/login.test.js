const request = require('supertest');
const { app, server } = require('../server');
const mongoose = require('mongoose');

describe('POST/login', () => {

  beforeAll(async () => {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    mongoose.connection.close();
    server.close();
  });

  it('should log in successfully with valid credentials', async () => {
    // Now, attempt to log in with the same credentials
    const res = await request(app)
      .post('/login')
      .send({
        email: 'test1@example.com',
        password: 'password123'
      });

    // Assertions
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('email', 'test1@example.com');
    expect(res.body).toHaveProperty('username', 'testuser');
  });

  it('should not log in with an incorrect password', async () => {
    // Attempt to log in with an incorrect password
    const res = await request(app)
      .post('/login')
      .send({
        email: 'test2@example.com',
        password: 'wrongpassword'
      });

    // Assertions
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Invalid email or password');
  });

  it('should not log in with a non-existent email', async () => {
    // Attempt to log in with a non-existent email
    const res = await request(app)
      .post('/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'password123'
      });

    // Assertions
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Invalid email or password');
  });
});
