const mongoose = require('mongoose');
const request = require('supertest');
const { app, server } = require('../server');
const User = require('../models/user');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    server.close();
});

beforeEach(async () => {
    await User.deleteMany({});
});

describe('Tests for adminAuthLogin', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await request(app)
      .post('/register')
      .send({ userName: "Test User", email: "zhechengyao123@gmail.com", password: "12345abcde", passwordCheck: "12345abcde" });
  });

  // test("Successfully logged in", async () => {
  //   const response = await request(app)
  //     .post('/login')
  //     .send({ email: "zhechengyao123@gmail.com", password: "12345abcde" });
      
  //   expect(response.status).toBe(200);
  //   expect(response.body.email).toBe("zhechengyao123@gmail.com");
  // });

  test('Email address does not exist', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: "wrong@gmail.com", password: "12345abcde" });
      
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ error: "Invalid Email or password" });
  });
});

describe('Tests for adminAuthRegister', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  // test("Successfully registered", async () => {
  //   const response = await request(app)
  //     .post('/register')
  //     .send({ userName: "Test User", email: "zhechengyao123@gmail.com", password: "12345abcde", passwordCheck: "12345abcde" });

  //   expect(response.status).toBe(200);
  //   expect(response.body.email).toBe("zhechengyao123@gmail.com");
  //   expect(response.body.password).toBe("12345abcde");
  //   expect(response.body.passwordCheck).toBe("12345abcde");
	// });


  test("Passwords do not match", async () => {
    const response = await request(app)
      .post('/register')
      .send({ userName: "Test User", email: "zhechengyao123@gmail.com", password: "12345abcde", passwordCheck: "wrongpassword" });

    expect(response.status).toBe(402);
    expect(response.body).toStrictEqual({ error: "Passwords do not match" });
  });
});
