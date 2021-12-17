## Description
This project covers basic CRUD APIs.
* Authentication (passport & jwt)
* Database (mongoose)
* linting using standard
* Configured for API versioning


## Requirements
* node > v10.15.3
* MongoDB

## .env Configuration
To simulate environment variables in Dev environment, please create .env file at the root location and define the following properties -

```
NODE_ENV=production                                 // Node environment development/production
PORT=8000                                           // Server Port
SESSION=0.0.0.0                                     // secret-boilerplate-token
JWT_SECRET=This_Should_be_32_characters_long        // Jwt secret
DATABASE_URL=mongodb://localhost:27017/test-dev    // Mongo database url

## Usage
* npm install
* set .env
* `npm start` Start server on development mode with Nodemon



