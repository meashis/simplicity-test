const jwt = require('jsonwebtoken');
const { getUserById } = require('../models/User');
require('dotenv').config();

/**
 * Middleware function for authenticating JWT tokens.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
module.exports = async function (req, res, next) {
    try {
    // Get the token from the request header
    let token = req.header('x-auth-token');
    if(!token) {
        const _token = req.header('Authorization');
        if(_token) {
            token = _token.split(' ')[1]
        }
    }

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        const _user = await getUserById(req.db, req.user.id)
        req.user = {
            ...req.user,
            ..._user
        }
        next(); // Pass control to the next middleware
    } catch (err) {
        console.log(err)
        res.status(401).json({ msg: 'Token is not valid' });
    }
};