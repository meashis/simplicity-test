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

    // Add other methods as necessary
}

module.exports = User;
