const { getAllDogs } = require('../src/controllers/dogController');
const Dog = require('../src/models/Dog');
const httpMocks = require('node-mocks-http');

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
});
