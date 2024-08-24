const { sql } = require('../config/db');

/**
 * Post model class for managing blog post-related operations.
 */
class Post {
    /**
     * Creates a new blog post in the database.
     * @param {sql.ConnectionPool} pool - The database connection pool.
     * @param {string} author - The author of the post.
     * @param {string} title - The title of the post.
     * @param {string} content - The content of the post.
     * @returns {Promise<void>}
     */
    static async createPost(pool, author, title, content) {
        await pool.request()
            .input('author', sql.NVarChar, author)
            .input('title', sql.NVarChar, title)
            .input('content', sql.NVarChar, content)
            .query('INSERT INTO Posts (author, title, content, created_at, updated_at) VALUES (@author, @title, @content, GETDATE(), GETDATE())');
    }

    // Add other methods as necessary
}

module.exports = Post;
