const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the post
 *         title:
 *           type: string
 *           description: The title of the post
 *         content:
 *           type: string
 *           description: The content of the post
 *         author:
 *           type: string
 *           description: The author of the post
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date the post was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date the post was last updated
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts managing API
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Returns the list of all the posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: The list of the posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
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
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get the post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The post description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: The post was not found
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
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: The post was successfully created
 *       500:
 *         description: Some server error
 */
router.post('/', auth, async (req, res) => {
    try {
        const pool = req.db;
        await Post.createPost(pool, req.user.username, req.body.title, req.body.content);
        res.status(201).json({ msg: 'Post created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update the post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The post id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The post was updated
 *       404:
 *         description: The post was not found
 *       500:
 *         description: Some server error
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
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete the post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The post was deleted
 *       404:
 *         description: The post was not found
 *       500:
 *         description: Some server error
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
