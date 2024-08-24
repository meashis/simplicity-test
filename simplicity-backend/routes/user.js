const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
require('dotenv').config();

/**
 * Route to register a new user.
 * @route POST /api/users/register
 * @access Public
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
 * Route to authenticate a user and get a token.
 * @route POST /api/users/login
 * @access Public
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const pool = req.db;
        // Here you would typically fetch the user from the database and compare passwords
        // This is a simplified example:
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
 * Route to get user profile.
 * @route GET /api/users/profile
 * @access Private
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
