const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { authenticateToken } = require('../middleware/auth');

// Search jobs route
router.get('/search', authenticateToken, jobController.searchJobs);

module.exports = router; 