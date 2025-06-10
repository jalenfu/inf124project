const sql = require('mssql');
const dbConfig = require('../config/database');

const applicationService = {
  async createApplication(userId, jobData) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request()
        .input('userId', sql.Int, userId)
        .input('jobId', sql.VarChar, jobData.id)
        .input('jobTitle', sql.VarChar, jobData.title)
        .input('companyName', sql.VarChar, jobData.company_name)
        .input('location', sql.VarChar, jobData.location)
        .input('status', sql.VarChar, jobData.status || 'Wishlisted')
        .input('apply_deadline', sql.Date, jobData.apply_deadline || null)
        .input('interview_date', sql.Date, jobData.interview_date || null)
        .input('oa_deadline', sql.Date, jobData.oa_deadline || null)
        .query(`
          INSERT INTO applications (user_id, job_id, job_title, company_name, location, status, apply_deadline, interview_date, oa_deadline)
          VALUES (@userId, @jobId, @jobTitle, @companyName, @location, @status, @apply_deadline, @interview_date, @oa_deadline);
          SELECT SCOPE_IDENTITY() AS id;
        `);

      return result.recordset[0].id;
    } catch (error) {
      throw new Error(`Failed to create application: ${error.message}`);
    }
  },

  async getUserApplications(userId) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request()
        .input('userId', sql.Int, userId)
        .query(`
          SELECT * FROM applications
          WHERE user_id = @userId
          ORDER BY applied_date DESC
        `);

      return result.recordset;
    } catch (error) {
      throw new Error(`Failed to get applications: ${error.message}`);
    }
  },

  async updateApplicationStatus(applicationId, userId, status, notes = null, apply_deadline = null, interview_date = null, oa_deadline = null) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request()
        .input('applicationId', sql.Int, applicationId)
        .input('userId', sql.Int, userId)
        .input('status', sql.VarChar, status)
        .input('notes', sql.Text, notes)
        .input('apply_deadline', sql.Date, apply_deadline)
        .input('interview_date', sql.Date, interview_date)
        .input('oa_deadline', sql.Date, oa_deadline)
        .query(`
          UPDATE applications
          SET status = @status,
              notes = @notes,
              apply_deadline = @apply_deadline,
              interview_date = @interview_date,
              oa_deadline = @oa_deadline,
              last_updated = GETDATE()
          WHERE id = @applicationId AND user_id = @userId;
        `);

      return result.rowsAffected[0] > 0;
    } catch (error) {
      throw new Error(`Failed to update application: ${error.message}`);
    }
  },

  async deleteApplication(applicationId, userId) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request()
        .input('applicationId', sql.Int, applicationId)
        .input('userId', sql.Int, userId)
        .query(`
          DELETE FROM applications
          WHERE id = @applicationId AND user_id = @userId;
        `);

      return result.rowsAffected[0] > 0;
    } catch (error) {
      throw new Error(`Failed to delete application: ${error.message}`);
    }
  }
};

module.exports = applicationService; 