const { sql } = require('../config/database');

// Create the Users table if it doesn't exist
async function createUsersTable() {
  try {
    await sql.query`
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
    `;
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
      const result = await sql.query`
        SELECT * FROM Users WHERE id = ${id}
      `;
      return result.recordset[0];
    } catch (err) {
      console.error('Error finding user by id:', err);
      throw err;
    }
  },

  async findByUsername(username) {
    try {
      const result = await sql.query`
        SELECT * FROM Users WHERE username = ${username}
      `;
      return result.recordset[0];
    } catch (err) {
      console.error('Error finding user by username:', err);
      throw err;
    }
  },

  async findByEmail(email) {
    try {
      const result = await sql.query`
        SELECT * FROM Users WHERE email = ${email}
      `;
      return result.recordset[0];
    } catch (err) {
      console.error('Error finding user by email:', err);
      throw err;
    }
  },

  async create(userData) {
    try {
      const result = await sql.query`
        INSERT INTO Users (username, firstName, lastName, password, email, role)
        OUTPUT INSERTED.*
        VALUES (${userData.username}, ${userData.firstName}, ${userData.lastName}, ${userData.password}, ${userData.email}, ${userData.role || 'user'})
      `;
      return result.recordset[0];
    } catch (err) {
      console.error('Error creating user:', err);
      throw err;
    }
  },

  async update(id, userData) {
    try {
      let query = 'UPDATE Users SET ';
      const updates = [];
      const params = [];

      if (userData.preferred_location !== undefined) {
        updates.push('preferred_location = @preferred_location');
        params.push({ name: 'preferred_location', value: userData.preferred_location });
      }

      if (userData.preferred_industry !== undefined) {
        updates.push('preferred_industry = @preferred_industry');
        params.push({ name: 'preferred_industry', value: userData.preferred_industry });
      }

      if (userData.profile_picture !== undefined) {
        updates.push('profile_picture = @profile_picture');
        params.push({ name: 'profile_picture', value: userData.profile_picture });
      }

      if (updates.length === 0) {
        throw new Error('No valid fields to update');
      }

      query += updates.join(', ') + ', updatedAt = GETDATE() OUTPUT INSERTED.* WHERE id = @id';
      params.push({ name: 'id', value: id });

      const request = new sql.Request();
      params.forEach(param => {
        request.input(param.name, param.value);
      });

      const result = await request.query(query);
      return result.recordset[0];
    } catch (err) {
      console.error('Error updating user:', err);
      throw err;
    }
  },

  async delete(id) {
    try {
      await sql.query`
        DELETE FROM Users WHERE id = ${id}
      `;
      return true;
    } catch (err) {
      console.error('Error deleting user:', err);
      throw err;
    }
  }
};

module.exports = { User, createUsersTable }; 