const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');
dotenv.config();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node.js Headless CMS API',
            version: '1.0.0',
            description: 'A simple Node.js headless CMS API'
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 500}`,
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your JWT token in the format **Bearer &lt;token&gt;**'
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./routes/*.js'], // Path to the API docs (adjust based on your file structure)
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`Swagger docs available at http://localhost:${process.env.PORT || 500}/api-docs`);
}

module.exports = setupSwagger;
