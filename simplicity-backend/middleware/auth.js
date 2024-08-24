const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware function for authenticating JWT tokens.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
module.exports = function (req, res, next) {
    // Get the token from the request header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next(); // Pass control to the next middleware
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};