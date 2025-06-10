-- Create users table if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    CREATE TABLE users (
        id INT PRIMARY KEY IDENTITY(1,1),
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at DATETIME DEFAULT GETDATE()
    );
END

-- Add new columns to users table if they don't exist
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('users') AND name = 'preferred_location')
BEGIN
    ALTER TABLE users ADD preferred_location VARCHAR(255);
END

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('users') AND name = 'preferred_industry')
BEGIN
    ALTER TABLE users ADD preferred_industry VARCHAR(255);
END

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('users') AND name = 'profile_picture')
BEGIN
    ALTER TABLE users ADD profile_picture VARCHAR(255) DEFAULT 'default1.svg';
END

-- Create applications table if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'applications')
BEGIN
    CREATE TABLE applications (
        id INT PRIMARY KEY IDENTITY(1,1),
        user_id INT NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'Wishlisted',
        application_date DATE,
        interview_date DATE,
        notes TEXT,
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
END

-- Create index on user_id for faster lookups
if not exists (select * from sys.indexes where name = 'idx_applications_user_id' and object_id = object_id('applications'))
CREATE INDEX idx_applications_user_id ON applications(user_id); 