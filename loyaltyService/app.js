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

// Start of section for openAPI documentation: (source:https://blog.logrocket.com/documenting-your-express-api-with-swagger/)
/**
*@openapi
*   components:
*       schemas:
*           User:
*               type: object
*               required:
*                   - email
*               properties:
*                   user:
*                       type: string
*                       description: Requester
*                   balance:
*                       type: integer
*                       description: User's balance.
*               example:
*                   user: email@email.com
*                   balance: 1000
*           Receipt:
*               type: object
*               required:
*                   - email
*                   - receiptId
*                   - paid
*               properties:
*                   receiptId:
*                       type: string
*                       description: unique identifier on receipt
*                   email:
*                       type: string
*                       description: email address
*                   paid:
*                       type: integer
*                       description: total DKK value of the receipt to receive right number of points
*               example:
*                   email: email@email.com
*                   receiptId: "112"
*                   paid: 1320
*/
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Swagger documentation for loyalty",
            version: "0.1.0",
            description:
                "This is a simple application made with Express and documented with Swagger",
            license: {
                name: "Apache '2.0'",
                url: "http://www.apage.org/licences/LICENSE-2.0.html",
            },
            contact: {
                name: "Mo",
                url: "mywebsite.com",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: `http://localhost:${PORT}/`,
            },
        ],
    },
    apis: [path.join(__dirname, 'app.js'), path.join(__dirname, '/src/routers/balanceRouter.js'), path.join(__dirname, '/src/routers/transactionRouter.js')],
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
//end of openAPI documentation section

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`);
});