const express = require('express');
const dotenv = require('dotenv');
const dbMiddleware = require('./middleware/dbMiddleware');
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(dbMiddleware); // Apply database middleware globally

/**
 * User routes.
 * @module routes/user
 */
app.use('/api/users', require('./routes/user'));

/**
 * Post routes.
 * @module routes/post
 */
app.use('/api/posts', require('./routes/post'));

/**
 * Page routes.
 * @module routes/page
 */
app.use('/api/pages', require('./routes/page'));

/**
 * Comment routes.
 * @module routes/comment
 */
app.use('/api/comments', require('./routes/comment'));

const PORT = process.env.PORT || 5000;

/**
 * Start the server and listen on the specified port.
 */
function startServer() {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Start the server
startServer();
