const { sql } = require('../config/db');

/**
 * User model class for managing user-related operations.
 */
class User {
    /**
     * Creates a new user in the database.
     * @param {sql.ConnectionPool} pool - The database connection pool.
     * @param {string} username - The username of the user.
     * @param {string} passwordHash - The hashed password of the user.
     * @returns {Promise<void>}
     */
    static async createUser(pool, username, passwordHash) {
        await pool.request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, passwordHash)
            .query('INSERT INTO Users (username, password) VALUES (@username, @password)');
    }

    /**
     * Retrieves a user by username.
     * @param {sql.ConnectionPool} pool - The database connection pool.
     * @param {string} username - The username to search for.
     * @returns {Promise<Object|null>} The user object or null if not found.
     */
        static async getUserByUsername(pool, username) {
            const result = await pool.request()
                .input('username', sql.NVarChar, username)
                .query('SELECT * FROM Users WHERE username = @username');
    
            return result.recordset.length > 0 ? result.recordset[0] : null;
        }

    // Add other methods as necessary
}

module.exports = User;
