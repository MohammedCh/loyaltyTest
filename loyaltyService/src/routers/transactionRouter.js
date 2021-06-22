const { MongoClient } = require('mongodb');
const debug = require('debug')('app:addTransactionRouter');
const express = require('express');

const transactionRouter = express.Router();

/**
*@openapi
*   components:
*       schemas:
*           Email:
*               type: string
*               format: email
*               description: email address
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
/**
 * @openapi
 *   /transaction/add:
 *     post:
 *       summary: "Registers a receipt so user can earn loyalty points"
 *       tags: [Earn points]
 *       requestBody:
 *          description: "receipt object"
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Receipt'
 *              application/xml:
 *                  schema:
 *                      $ref: '#/components/schemas/Receipt'
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/Receipt'
 *              text/plain:
 *                  schema:
 *                      type: string
 *       responses:
 *         default:
 *           description: receipt added successfully
 *       x-codegen-request-body-name: body
 */

transactionRouter.post('/add', (async (req, res) => {
    const email = req.body.email;
    const transactionId = req.body.receiptId;
    const value = req.body.paid;

    try {
        await addTransaction(email, transactionId, value);
        res.send("New transaction logged successfully");
    } catch (error) {
        debug(error.stack);
    }
}));


async function addTransaction(email, transactionId, paid) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'receipts';
    let client;
    let db;
    try {
        client = await MongoClient.connect(url);
        debug('Connected to mongo DB');

        db = client.db(dbName);

        document = { email: email, receiptId: transactionId, DKKvalue: paid };
        const response = await db.collection('receipts').insert(document);
        //res.json(response);
        console.log(response);
    }
    catch (error) {
        debug(error.stack);
    }
    finally {
        client.close(); // ends node session when work is done
    }
}

//addTransaction("helloword1", "3", 500);
module.exports = transactionRouter;