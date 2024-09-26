# Support Ticket System

This is a NestJS-based API for a Support Ticket System. It provides endpoints for creating, retrieving, updating, and deleting support tickets, as well as user authentication.

## Features

- Create, read, update, and delete support tickets
- User registration and authentication using JWT
- MongoDB integration using Mongoose
- Swagger API documentation

## Prerequisites

- Node.js (v14.x or later)
- MongoDB (v4.4 or later)
- npm (v6.x or later)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/bigthinz/support-ticket-system.git
   cd support-ticket-system
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/support-ticket-system
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRATION=1h
   ```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation

Once the application is running, you can access the Swagger API documentation at:

```
http://localhost:4000/api
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
