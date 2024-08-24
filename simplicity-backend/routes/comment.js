const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

/**
 * Route to add a comment to a blog post.
 * @route POST /api/comments
 * @access Private
 */
router.post('/', auth, async (req, res) => {
    try {
        const pool = req.db;
        await Comment.addComment(pool, req.body.postId, req.user.id, req.body.comment);
        res.status(201).json({ msg: 'Comment added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * Route to get comments by post ID.
 * @route GET /api/comments/:postId
 * @access Public
 */
router.get('/:postId', async (req, res) => {
    try {
        const pool = req.db;
        const result = await pool.request()
            .input('postId', req.params.postId)
            .query('SELECT * FROM Comments WHERE post_id = @postId');

        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * Route to delete a comment by ID.
 * @route DELETE /api/comments/:id
 * @access Private
 */
router.delete('/:id', auth, async (req, res) => {
    try {
        const pool = req.db;
        await pool.request()
            .input('id', req.params.id)
            .query('DELETE FROM Comments WHERE id = @id');

        res.json({ msg: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
