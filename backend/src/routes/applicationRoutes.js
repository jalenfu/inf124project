const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { authenticateToken } = require('../middleware/auth');

// Create a new application
router.post('/', authenticateToken, applicationController.createApplication);

// Get all applications for the current user
router.get('/', authenticateToken, applicationController.getUserApplications);

// Update application status
router.put('/:applicationId/status', authenticateToken, applicationController.updateApplicationStatus);

// Delete an application
router.delete('/:applicationId', authenticateToken, applicationController.deleteApplication);

module.exports = router; 