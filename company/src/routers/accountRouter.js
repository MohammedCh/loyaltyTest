const express = require('express');
const debug = require('debug')('app:signUoRouter');
const { MongoClient } = require('mongodb');
const userService = require('../services/userService');

const accountRouter = express.Router();

accountRouter.route('/').get((req, res) => {
    res.render('signIn');
});

let email;

accountRouter.get('/account', (async (req, res) => {
    email = req.query.email;
    try {
        //console.log(email);
        const existingUser = await signIn(email);
        if (email === existingUser) {
            const userInfo = await userService.getUserBalanceByEmail(email);
            res.render('account', { email, balance: userInfo.balance });
        }
        else {
            console.log("different");
            res.send("User with " + email + " email doesn't exist!");
        };
    } catch (error) {
        debug(error.stack);
    }
}));

accountRouter.post('/account/addTransaction', (async (req, res) => {
    const transactionId = req.body.receiptId;
    const value = parseInt(req.body.paid);
    try {
        await userService.addTransaction(email, transactionId, value);
        console.log("transaction API callled successfully!");
        res.redirect("/signIn");
    } catch (error) {
        debug(error.stack);
    }
}));

async function signIn(email) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'users';
    let client;
    let db;
    try {
        client = await MongoClient.connect(url);
        debug('Connected to mongo DB');

        db = client.db(dbName);

        document = { email: email };
        const response = await db.collection('users').findOne(document);
        //res.json(response);
        if (response) {
            return response.email;
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

//signIn("helloword1@email.com")

module.exports = accountRouter;