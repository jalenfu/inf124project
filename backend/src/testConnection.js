const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    port: 1433, // Default SQL Server port
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

async function testConnection() {
    try {
        console.log('Attempting to connect to SQL Server...');
        console.log(`Connection details: Server=${config.server}:${config.port}, User=${config.user}`);
        
        await sql.connect(config);
        console.log('Successfully connected to SQL Server!');
        
        // Test query
        const result = await sql.query`SELECT @@version as version`;
        console.log('SQL Server version:', result.recordset[0].version);
        
    } catch (err) {
        console.error('Error connecting to SQL Server:', err);
        if (err.originalError) {
            console.error('Original error:', err.originalError.message);
        }
    } finally {
        await sql.close();
    }
}

testConnection(); 