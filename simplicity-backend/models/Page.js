const { sql } = require('../config/db');

/**
 * Page model class for managing page-related operations.
 */
class Page {
    /**
     * Creates a new page in the database.
     * @param {sql.ConnectionPool} pool - The database connection pool.
     * @param {string} title - The title of the page.
     * @param {string} content - The content of the page.
     * @returns {Promise<void>}
     */
    static async createPage(pool, title, content) {
        await pool.request()
            .input('title', sql.NVarChar, title)
            .input('content', sql.NVarChar, content)
            .query('INSERT INTO Pages (title, content, created_at, updated_at) VALUES (@title, @content, GETDATE(), GETDATE())');
    }

    // Add other methods as necessary
}

module.exports = Page;
