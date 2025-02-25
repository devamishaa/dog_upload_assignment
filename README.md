# Dog Pictures API

A RESTful API for uploading and managing dog pictures with image compression.

## Features

- Upload dog pictures
- Retrieve list of uploaded dog pictures
- Fetch specific dog pictures by ID
- Update existing dog pictures
- Delete dog pictures
- Automatic image compression
- Proper HTTP response codes and error handling
- Comprehensive test suite

## Requirements

- Node.js 14.x or higher
- npm or yarn

## Installation

### Option 1: Standard Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd dog-pics-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

The API will be available at http://localhost:3000/api

### Option 2: Docker Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd dog-pics-api
   ```

2. Build the Docker image:
   ```
   docker build -t dog-pics-api .
   ```

3. Run the container:
   ```
   docker run -p 3000:3000 dog-pics-api
   ```

The API will be available at http://localhost:3000/api

## Running Tests

```
npm test
```

## API Documentation

See the [API Documentation](API_DOCUMENTATION.md) for detailed information about the available endpoints and their usage.

## Project Structure

```
dog-pics-api/
├── app.js           # Main application file
├── package.json     # Project dependencies
├── Dockerfile       # Docker configuration
├── uploads/         # Directory for uploaded images
├── tests/           # Test files
│   ├── api.test.js  # API tests
│   └── test-files/  # Test image files
└── API_DOCUMENTATION.md  # API documentation
```

## Implementation Details

- **Storage:** Images are stored on the local filesystem in the uploads/ directory.
- **Compression:** Using Sharp library to resize and compress images.
- **Unique IDs:** Using UUID v4 for generating unique identifiers for each image.
- **In-memory Database:** Currently using an in-memory array to store image metadata. For production, this should be replaced with a proper database.

## Possible Enhancements

- Add authentication/authorization
- Implement pagination for the list endpoint
- Add image metadata extraction
- Implement a proper database for storage
- Add image categorization or tagging
- Implement caching
