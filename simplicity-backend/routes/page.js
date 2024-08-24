const express = require('express');
const router = express.Router();
const Page = require('../models/Page');
const auth = require('../middleware/auth');

/**
 * Route to create a new page.
 * @route POST /api/pages
 * @access Private
 */
router.post('/', auth, async (req, res) => {
    try {
        const pool = req.db;
        await Page.createPage(pool, req.body.title, req.body.content);
        res.status(201).json({ msg: 'Page created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * Route to get all pages.
 * @route GET /api/pages
 * @access Public
 */
router.get('/', async (req, res) => {
    try {
        const pool = req.db;
        const result = await pool.request().query('SELECT * FROM Pages');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * Route to get a page by ID.
 * @route GET /api/pages/:id
 * @access Public
 */
router.get('/:id', async (req, res) => {
    try {
        const pool = req.db;
        const result = await pool.request()
            .input('id', req.params.id)
            .query('SELECT * FROM Pages WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ msg: 'Page not found' });
        }

        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * Route to update a page by ID.
 * @route PUT /api/pages/:id
 * @access Private
 */
router.put('/:id', auth, async (req, res) => {
    try {
        const pool = req.db;
        await pool.request()
            .input('id', req.params.id)
            .input('title', req.body.title)
            .input('content', req.body.content)
            .query('UPDATE Pages SET title = @title, content = @content, updated_at = GETDATE() WHERE id = @id');

        res.json({ msg: 'Page updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * Route to delete a page by ID.
 * @route DELETE /api/pages/:id
 * @access Private
 */
router.delete('/:id', auth, async (req, res) => {
    try {
        const pool = req.db;
        await pool.request()
            .input('id', req.params.id)
            .query('DELETE FROM Pages WHERE id = @id');

        res.json({ msg: 'Page deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
