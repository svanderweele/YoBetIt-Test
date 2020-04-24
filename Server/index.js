const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();

//Middleware

// Swagger Setup

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'YoBetIt Test Project API',
            description: 'A simple test API',
            version: '1.0.0',
        },
    },
    // Path to the API docs
    apis: ['../Models/Response.js', './api/routes/*.js'],
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions), { explorer: true }));

app.use(express.json());
app.use(cors());

//Defining routes
const countries = require('./api/routes/countries');
app.use('/api/countries', countries);


//Setup Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


module.exports = app;