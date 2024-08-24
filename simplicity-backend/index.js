const express = require('express');
const dotenv = require('dotenv');
const dbMiddleware = require('./middleware/dbMiddleware');
const { poolPromise } = require('./config/db');
const setupSwagger = require('./swagger');
dotenv.config();

/**
 * Start the server and listen on the specified port.
 */
async function startServer() {
    try {
        const pool = await poolPromise;

        // If database connection is successful, instantiate the Express app
        const app = express();

        // Middleware
        app.use(express.json());
        app.use(dbMiddleware(pool)); // Inject the pool into dbMiddleware

        // Setup Swagger
        setupSwagger(app);

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

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Database connection failed', err);
        process.exit(1); // Exit the process if the database connection fails
    }
}

// Start the server
startServer();
