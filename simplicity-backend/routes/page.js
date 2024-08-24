const express = require('express');
const router = express.Router();
const Page = require('../models/Page');
const auth = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Page:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the page
 *         title:
 *           type: string
 *           description: The title of the page
 *         content:
 *           type: string
 *           description: The content of the page
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date the page was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date the page was last updated
 */

/**
 * @swagger
 * tags:
 *   name: Pages
 *   description: The pages managing API
 */

/**
 * @swagger
 * /api/pages:
 *   get:
 *     summary: Returns the list of all the pages
 *     tags: [Pages]
 *     responses:
 *       200:
 *         description: The list of the pages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Page'
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
 * @swagger
 * /api/pages/{id}:
 *   get:
 *     summary: Get the page by id
 *     tags: [Pages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The page id
 *     responses:
 *       200:
 *         description: The page description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Page'
 *       404:
 *         description: The page was not found
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
 * @swagger
 * /api/pages:
 *   post:
 *     summary: Create a new page
 *     tags: [Pages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Page'
 *     responses:
 *       201:
 *         description: The page was successfully created
 *       500:
 *         description: Some server error
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
 * @swagger
 * /api/pages/{id}:
 *   put:
 *     summary: Update the page by id
 *     tags: [Pages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The page id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Page'
 *     responses:
 *       200:
 *         description: The page was updated
 *       404:
 *         description: The page was not found
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
            .query('UPDATE Pages SET title = @title, content = @content, updated_at = GETDATE() WHERE id = @id');

        res.json({ msg: 'Page updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/pages/{id}:
 *   delete:
 *     summary: Delete the page by id
 *     tags: [Pages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The page id
 *     responses:
 *       200:
 *         description: The page was deleted
 *       404:
 *         description: The page was not found
 *       500:
 *         description: Some server error
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
