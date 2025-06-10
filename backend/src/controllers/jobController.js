const jobService = require('../services/jobService');

const jobController = {
  async searchJobs(req, res) {
    try {
      // console.log('Received search request with params:', req.query);
      const { query, location, page, radius } = req.query;
      
      const jobs = await jobService.searchJobs(query, location, page, radius);
      // console.log('Search results:', jobs);
      
      if (!jobs || !Array.isArray(jobs.jobs)) {
        throw new Error('Invalid response format from job service');
      }

      res.json(jobs);
    } catch (error) {
      console.error('Job search error:', error);
      res.status(500).json({ 
        error: 'Failed to search jobs',
        message: error.message,
        details: error.response?.data || error.stack
      });
    }
  }
};

module.exports = jobController; 