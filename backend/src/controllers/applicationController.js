const applicationService = require('../services/applicationService');

const applicationController = {
  async createApplication(req, res) {
    try {
      const userId = req.user.id;
      const jobData = req.body;

      const applicationId = await applicationService.createApplication(userId, jobData);
      res.status(201).json({ id: applicationId, message: 'Application created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUserApplications(req, res) {
    try {
      const userId = req.user.id;
      const applications = await applicationService.getUserApplications(userId);
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateApplicationStatus(req, res) {
    try {
      const userId = req.user.id;
      const { applicationId } = req.params;
      const { status, notes, apply_deadline, interview_date, oa_deadline } = req.body;

      const success = await applicationService.updateApplicationStatus(
        applicationId,
        userId,
        status,
        notes,
        apply_deadline,
        interview_date,
        oa_deadline
      );
      if (!success) {
        return res.status(404).json({ error: 'Application not found' });
      }

      res.json({ message: 'Application status updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteApplication(req, res) {
    try {
      const userId = req.user.id;
      const { applicationId } = req.params;

      const success = await applicationService.deleteApplication(applicationId, userId);
      if (!success) {
        return res.status(404).json({ error: 'Application not found' });
      }

      res.json({ message: 'Application deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = applicationController; 