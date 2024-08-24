const sql = require('mssql');
require('dotenv').config();

// Database configuration
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// SQL queries to create tables
const createTablesQuery = `
CREATE TABLE Users (
    id INT PRIMARY KEY IDENTITY(1,1),
    username NVARCHAR(255) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Posts (
    id INT PRIMARY KEY IDENTITY(1,1),
    author NVARCHAR(255) NOT NULL,
    title NVARCHAR(255) NOT NULL,
    content NVARCHAR(MAX) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Pages (
    id INT PRIMARY KEY IDENTITY(1,1),
    title NVARCHAR(255) NOT NULL,
    content NVARCHAR(MAX) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Comments (
    id INT PRIMARY KEY IDENTITY(1,1),
    post_id INT NOT NULL FOREIGN KEY REFERENCES Posts(id) ON DELETE CASCADE,
    user_id INT NOT NULL FOREIGN KEY REFERENCES Users(id) ON DELETE CASCADE,
    comment NVARCHAR(MAX) NOT NULL,
    commented_at DATETIME DEFAULT GETDATE()
);
`;

// Function to execute the table creation
async function createTables() {
    try {
        // Connect to the database
        const pool = await sql.connect(config);
        // Execute the query
        await pool.request().query(createTablesQuery);
        console.log('Tables created successfully!');
    } catch (err) {
        console.error('Error creating tables:', err);
    } finally {
        // Close the connection
        sql.close();
    }
}

// Run the createTables function
createTables();
