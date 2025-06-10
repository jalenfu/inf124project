const { sql } = require('../config/database');

// Create the Applications table if it doesn't exist
async function createApplicationsTable() {
  try {
    await sql.query`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='applications' and xtype='U')
      CREATE TABLE applications (
        id INT PRIMARY KEY IDENTITY(1,1),
        user_id INT NOT NULL,
        job_id VARCHAR(255) NOT NULL,
        job_title VARCHAR(255) NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'Wishlisted',
        applied_date DATETIME DEFAULT GETDATE(),
        last_updated DATETIME DEFAULT GETDATE(),
        notes TEXT,
        apply_deadline DATE NULL,
        interview_date DATE NULL,
        oa_deadline DATE NULL,
        FOREIGN KEY (user_id) REFERENCES Users(id)
      )
    `;
    console.log('Applications table checked/created successfully');
  } catch (err) {
    console.error('Error creating Applications table:', err);
    throw err;
  }
}

module.exports = { createApplicationsTable }; 