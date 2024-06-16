const request = require('supertest');
const app = require('../server'); // Assuming your app is defined in a file named app.js

describe('Server Test', () => {
  let server;

  beforeAll(() => {
    server = app.listen(4000); // Listen on a different port for testing
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return 200 and a message', async () => {
    const response = await request(server).get('/test');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello World!');
  });
});
