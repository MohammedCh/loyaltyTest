const { MongoClient } = require('mongodb');
const debug = require('debug')('app:getUserBalance');

const express = require('express');

const balanceRouter = express.Router();

/**
 * @openapi
 *   /getByEmail/{email}:
 *     get:
 *       summary: Retrieves user balance by email
 *       tags: [User balance]
 *       parameters:
 *          - name: email
 *            in: path
 *            required: true
 *            description: the user's email address
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Email'
 *       responses:
 *         200:
 *           description: Here is the user's balance
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 */

balanceRouter.get('/:email', async (req, res) => {
    console.log("hi");
    accountBalance = await calculateUserBalance(req.params.email);
    if (accountBalance) {
        res.json(JSON.stringify({ user: req.params.email, balance: accountBalance }));
    } else { res.send("No such user in DB") };
});

async function calculateUserBalance(email) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'receipts';
    let client;
    let db;
    try {
        client = await MongoClient.connect(url);
        debug('Connected to mongo DB');

        db = client.db(dbName);

        document = { email: email };
        const aggregatePoints = await db.collection('receipts').aggregate([
            { $match: { email: email } },
            { $group: { _id: "$email", total: { $sum: "$DKKvalue" } } },
            { $sort: { total: -1 } }
        ]).toArray();
        //res.json(response);
        if (aggregatePoints) {
            console.log(aggregatePoints[0].total);
            return aggregatePoints[0].total.toString();
        };
    }
    catch (error) {
        debug(error.stack);
    }
    finally {
        const admin = client.db(dbName).admin();
        //await client.db('users').dropDatabase(); //deletes database so we can run it again, without over populating it
        //console.log(await admin.listDatabases());
        client.close(); // ends node session when work is done
    }
}

module.exports = balanceRouter;