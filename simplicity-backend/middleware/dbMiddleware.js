const { poolPromise } = require('../config/db');

/**
 * Middleware to inject the database connection into each request.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
async function dbMiddleware(req, res, next) {
    try {
        const pool = await poolPromise;
        req.db = pool;
        next();
    } catch (err) {
        console.error('Failed to connect to the database', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = dbMiddleware;
