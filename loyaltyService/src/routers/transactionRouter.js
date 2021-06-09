const { MongoClient } = require('mongodb');
const debug = require('debug')('app:addTransactionRouter');
const express = require('express');

const transactionRouter = express.Router();

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