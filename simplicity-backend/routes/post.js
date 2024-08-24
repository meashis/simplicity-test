const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

/**
 * Route to create a new blog post.
 * @route POST /api/posts
 * @access Private
 */
router.post('/', auth, async (req, res) => {
    try {
        const pool = req.db;
        await Post.createPost(pool, req.user.id, req.body.title, req.body.content);
        res.status(201).json({ msg: 'Post created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * Route to get all blog posts.
 * @route GET /api/posts
 * @access Public
 */
router.get('/', async (req, res) => {
    try {
        const pool = req.db;
        const result = await pool.request().query('SELECT * FROM Posts');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * Route to get a blog post by ID.
 * @route GET /api/posts/:id
 * @access Public
 */
router.get('/:id', async (req, res) => {
    try {
        const pool = req.db;
        const result = await pool.request()
            .input('id', req.params.id)
            .query('SELECT * FROM Posts WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * Route to update a blog post by ID.
 * @route PUT /api/posts/:id
 * @access Private
 */
router.put('/:id', auth, async (req, res) => {
    try {
        const pool = req.db;
        await pool.request()
            .input('id', req.params.id)
            .input('title', req.body.title)
            .input('content', req.body.content)
            .query('UPDATE Posts SET title = @title, content = @content, updated_at = GETDATE() WHERE id = @id');

        res.json({ msg: 'Post updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * Route to delete a blog post by ID.
 * @route DELETE /api/posts/:id
 * @access Private
 */
router.delete('/:id', auth, async (req, res) => {
    try {
        const pool = req.db;
        await pool.request()
            .input('id', req.params.id)
            .query('DELETE FROM Posts WHERE id = @id');

        res.json({ msg: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
