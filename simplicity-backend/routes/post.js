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

module.exports = router;
