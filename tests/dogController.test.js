const { getAllDogs } = require('../src/controllers/dogController');
const Dog = require('../src/models/Dog');
const httpMocks = require('node-mocks-http');
const supertest = require('supertest');
const app = require('../src/server'); // Assuming you have an Express app in src/app.js
const server = app.listen(0); // Using port 0 lets OS choose an available port

jest.mock('../src/models/Dog');

describe('Dog Controller - getAllDogs', () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });

  it('should return all dogs in the database when multiple dogs exist', async () => {
    const mockDogs = [
      { name: 'Buddy', imageUrl: 'path/to/buddy.jpg' },
      { name: 'Max', imageUrl: 'path/to/max.jpg' },
      { name: 'Charlie', imageUrl: 'path/to/charlie.jpg' }
    ];

    Dog.find.mockResolvedValue(mockDogs);

    await getAllDogs(req, res);

    expect(Dog.find).toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual(mockDogs);
  });

  it('should return all dogs via API', async () => {
    const mockDogs = [
      { name: 'Buddy', imageUrl: 'path/to/buddy.jpg' },
      { name: 'Max', imageUrl: 'path/to/max.jpg' },
      { name: 'Charlie', imageUrl: 'path/to/charlie.jpg' }
    ];

    Dog.find.mockResolvedValue(mockDogs);

    const response = await supertest(app).get('/api/dogs');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDogs);
  });

  it('should return a specific dog by ID via API', async () => {
    const mockDog = { _id: '67be1ae5505017623377d30d', name: 'Buddy', imageUrl: 'path/to/buddy.jpg' };

    Dog.findById.mockResolvedValue(mockDog);

    const response = await supertest(app).get('/api/dogs/67be1ae5505017623377d30d');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDog);
  });

  afterAll(done => {
    server.close(done);
  });
});

