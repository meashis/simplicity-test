/**
 * Middleware factory to inject the database connection into each request.
 * @param {sql.ConnectionPool} pool - The database connection pool.
 * @returns {Function} - The middleware function.
 */
function dbMiddleware(pool) {
    return async (req, res, next) => {
        try {
            req.db = pool;
            next();
        } catch (err) {
            console.error('Failed to inject the database connection', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}

module.exports = dbMiddleware;
