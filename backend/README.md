# Zenvest Backend

Node.js/Express backend API for the Zenvest investment platform. Handles user authentication, fund management, holdings, orders, and positions.

## Features

- User authentication and email verification
- Fund management
- Stock data handling
- Order management
- Portfolio holdings and positions tracking
- RESTful API endpoints

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file in the root directory with required environment variables.

## Development

```bash
npm start
```

## Technologies

- Node.js
- Express
- MongoDB (Mongoose)
- Authentication & Email verification

## Project Structure

- `app.js` - Main application file
- `controllers/` - Route controllers
- `models/` - Database models
- `schemas/` - Data schemas
- `routes/` - API routes
- `middlewares/` - Custom middlewares
- `utils/` - Utility functions
- `initData/` - Initial data setup

## API Routes

- `POST /auth/*` - Authentication routes
- `GET /posts/*` - Data retrieval routes
- `POST /posts/*` - Data submission routes
- `GET /user/*` - User routes
