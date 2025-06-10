const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const { createUsersTable } = require('./models/User');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobRoutes');

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Initialize database and start server
async function startServer() {
  try {
    await connectDB();
    await createUsersTable();
    
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