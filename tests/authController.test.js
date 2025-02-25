const request = require('supertest');
const app = require('../src/server');
const User = require('../src/models/User');
const mongoose = require('mongoose');

describe('Auth Controller - Register', () => {
  let server;
  
  beforeAll(async () => {
    await mongoose.disconnect();
    server = app.listen(0); // Using port 0 lets the OS assign a random available port
  });

  afterAll(async () => {
    await server.close();
    await mongoose.disconnect();
  });




it('Should successfully register a new user with valid username and password', async () => {
  const mockUser = { username: 'newuser', password: 'newpassword' };
  
  // Mock User.find to return an empty array (user doesn't exist)
  User.find = jest.fn().mockResolvedValue([]);
  
  // Mock User.prototype.save
  User.prototype.save = jest.fn().mockResolvedValue();

  const response = await request(app)
    .post('/api/auth/register')
    .send(mockUser);

  expect(response.statusCode).toBe(201);
  expect(response.body).toEqual({ message: 'User registered successfully' });
  expect(User.find).toHaveBeenCalledWith({ username: mockUser.username });
  expect(User.prototype.save).toHaveBeenCalled();
});
});
