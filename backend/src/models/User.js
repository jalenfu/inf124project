const { getPool } = require('../config/database');

// Create the Users table if it doesn't exist
async function createUsersTable() {
  try {
    const pool = getPool();
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' and xtype='U')
      CREATE TABLE Users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        username NVARCHAR(255) NOT NULL UNIQUE,
        firstName NVARCHAR(255) NOT NULL,
        lastName NVARCHAR(255) NOT NULL,
        password NVARCHAR(255) NOT NULL,
        email NVARCHAR(255) NOT NULL UNIQUE,
        role NVARCHAR(50) NOT NULL DEFAULT 'user',
        preferred_location NVARCHAR(255),
        preferred_industry NVARCHAR(255),
        profile_picture NVARCHAR(255) DEFAULT 'default1.png',
        createdAt DATETIME DEFAULT GETDATE(),
        updatedAt DATETIME DEFAULT GETDATE()
      )
    `);
    console.log('Users table checked/created successfully');
  } catch (err) {
    console.error('Error creating Users table:', err);
    throw err;
  }
}

// User model methods
const User = {
  async findById(id) {
    try {
      const pool = getPool();
      const result = await pool.request()
        .input('id', id)
        .query('SELECT * FROM Users WHERE id = @id');
      return result.recordset[0];
    } catch (err) {
      console.error('Error finding user by id:', err);
      throw err;
    }
  },

  async findByUsername(username) {
    try {
      const pool = getPool();
      const result = await pool.request()
        .input('username', username)
        .query('SELECT * FROM Users WHERE username = @username');
      return result.recordset[0];
    } catch (err) {
      console.error('Error finding user by username:', err);
      throw err;
    }
  },

  async findByEmail(email) {
    try {
      const pool = getPool();
      const result = await pool.request()
        .input('email', email)
        .query('SELECT * FROM Users WHERE email = @email');
      return result.recordset[0];
    } catch (err) {
      console.error('Error finding user by email:', err);
      throw err;
    }
  },

  async create(userData) {
    try {
      const pool = getPool();
      const result = await pool.request()
        .input('username', userData.username)
        .input('firstName', userData.firstName)
        .input('lastName', userData.lastName)
        .input('password', userData.password)
        .input('email', userData.email)
        .input('role', userData.role || 'user')
        .query(`
          INSERT INTO Users (username, firstName, lastName, password, email, role)
          OUTPUT INSERTED.*
          VALUES (@username, @firstName, @lastName, @password, @email, @role)
        `);
      return result.recordset[0];
    } catch (err) {
      console.error('Error creating user:', err);
      throw err;
    }
  },

  async update(id, userData) {
    try {
      const pool = getPool();
      let query = 'UPDATE Users SET ';
      const updates = [];
      const request = pool.request();

      if (userData.preferred_location !== undefined) {
        updates.push('preferred_location = @preferred_location');
        request.input('preferred_location', userData.preferred_location);
      }

      if (userData.preferred_industry !== undefined) {
        updates.push('preferred_industry = @preferred_industry');
        request.input('preferred_industry', userData.preferred_industry);
      }

      if (userData.profile_picture !== undefined) {
        updates.push('profile_picture = @profile_picture');
        request.input('profile_picture', userData.profile_picture);
      }

      if (updates.length === 0) {
        throw new Error('No valid fields to update');
      }

      query += updates.join(', ') + ', updatedAt = GETDATE() OUTPUT INSERTED.* WHERE id = @id';
      request.input('id', id);

      const result = await request.query(query);
      return result.recordset[0];
    } catch (err) {
      console.error('Error updating user:', err);
      throw err;
    }
  },

  async delete(id) {
    try {
      const pool = getPool();
      await pool.request()
        .input('id', id)
        .query('DELETE FROM Users WHERE id = @id');
      return true;
    } catch (err) {
      console.error('Error deleting user:', err);
      throw err;
    }
  }
};

module.exports = { User, createUsersTable }; 