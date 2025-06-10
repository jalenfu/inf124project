// Load environment variables based on NODE_ENV
require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
});

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const { createUsersTable } = require('./models/User');
const { createApplicationsTable } = require('./models/Application');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

// CORS configuration
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      process.env.FRONTEND_URL.replace(/\/$/, ''), // Remove trailing slash
      process.env.FRONTEND_URL + '/', // Add trailing slash
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: 'CORS error: ' + err.message });
  }
  res.status(500).json({ message: 'Internal server error' });
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// Initialize database and start server
async function startServer() {
  try {
    await connectDB();
    await createUsersTable();
    await createApplicationsTable();
    
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer(); 