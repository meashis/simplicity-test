const { sql } = require('../config/db');

/**
 * Comment model class for managing comment-related operations.
 */
class Comment {
    /**
     * Adds a new comment to a blog post in the database.
     * @param {sql.ConnectionPool} pool - The database connection pool.
     * @param {number} postId - The ID of the post.
     * @param {number} userId - The ID of the user making the comment.
     * @param {string} comment - The content of the comment.
     * @returns {Promise<void>}
     */
    static async addComment(pool, postId, userId, comment) {
        await pool.request()
            .input('postId', sql.Int, postId)
            .input('userId', sql.Int, userId)
            .input('comment', sql.NVarChar, comment)
            .query('INSERT INTO Comments (post_id, user_id, comment, commented_at) VALUES (@postId, @userId, @comment, GETDATE())');
    }

    // Add other methods as necessary
}

module.exports = Comment;
