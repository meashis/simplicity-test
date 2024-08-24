const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
require('dotenv').config();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The user's username
 *         password:
 *           type: string
 *           description: The user's hashed password
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date the user was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date the user was last updated
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *       500:
 *         description: Some server error
 */
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const pool = req.db;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.createUser(pool, username, hashedPassword);

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in a user and return a token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Some server error
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const pool = req.db;
        // Fetch user and verify password here
        const user = {}; // Replace with actual user fetching logic

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get the logged-in user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user's profile
 *       500:
 *         description: Some server error
 */
router.get('/profile', auth, async (req, res) => {
    try {
        // Fetch user profile logic here
        res.json(req.user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
