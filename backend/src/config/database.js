const sql = require('mssql');

// Log the environment variables being used
console.log('Database Configuration:', {
  host: process.env.DB_HOST || '',
  database: process.env.DB_NAME || 'inf124',
  user: process.env.DB_USER || '',
  port: 1433
});

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: 'inf124',
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  }
};

let pool;

async function connectDB() {
  try {
    console.log('Attempting to connect to SQL Server...');
    pool = await sql.connect(config);
    console.log('Connected to SQL Server database successfully');
    return pool;
  } catch (err) {
    console.error('SQL Server Connection Error:');
    console.error('Error Code:', err.code);
    console.error('Error Number:', err.number);
    console.error('Error Message:', err.message);
    console.error('Error State:', err.state);
    console.error('Error Class:', err.class);
    console.error('Server Name:', err.serverName);
    console.error('Procedure Name:', err.procName);
    console.error('Line Number:', err.lineNumber);
    if (err.originalError) {
      console.error('Original Error:', err.originalError);
    }
    throw err;
  }
}

function getPool() {
  if (!pool) {
    throw new Error('Database connection not initialized');
  }
  return pool;
}

module.exports = {
  connectDB,
  getPool,
  sql
}; 