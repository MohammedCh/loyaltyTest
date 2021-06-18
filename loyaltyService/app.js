const express = require('express')
const path = require('path');
const balanceRouter = require("./src/routers/balanceRouter");
const transactionRouter = require("./src/routers/transactionRouter");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded. Used in the signUpRouter to retrieve the body from the form

app.use('/getByEmail', balanceRouter);
app.use('/transaction', transactionRouter);

// Start of section for openAPI documentation:
// (sources:https://blog.logrocket.com/documenting-your-express-api-with-swagger/, https://github.com/Surnet/swagger-jsdoc/blob/master/docs/CLI.md)

// Swagger definition
const definition = {
    openapi: "3.0.0",

    info: {
        title: "Swagger documentation for loyalty",
        version: "0.1.0",
        description: "This is a simple application made with Express and documented with Swagger",
        license: {
            name: "Apache '2.0'",
            url: "http://www.apage.org/licences/LICENSE-2.0.html",
        },
    },

    servers: [
        {
            url: `http://localhost:${PORT}/`,
        },
    ],
};

// Options for the swagger docs
const options = {
    definition,
    apis: [path.join(__dirname, 'app.js'), path.join(__dirname, '/src/routers/balanceRouter.js'), path.join(__dirname, '/src/routers/transactionRouter.js')],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const specs = swaggerJsdoc(options);

// Serve swagger docs the way you like (Recommendation: swagger-tools)
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
//end of openAPI documentation section

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`);
});