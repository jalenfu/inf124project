# Backend Server

This is the backend server for the Inf124 Project.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=3001
NODE_ENV=development
```

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

- `GET /`: Welcome message
- More endpoints will be added as the project develops

## Project Structure

```
backend/
├── src/
│   └── index.js      # Main application entry point
├── .env              # Environment variables
├── package.json      # Project dependencies and scripts
└── README.md         # This file
``` 