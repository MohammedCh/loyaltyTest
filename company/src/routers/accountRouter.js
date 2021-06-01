const express = require('express');
const debug = require('debug')('app:signUoRouter');
const { MongoClient } = require('mongodb');
const http = require('http');
const userService = require('../services/userService');

userService.getUserByEmail("f");

const accountRouter = express.Router();

accountRouter.route('/').get((req, res) => {
    res.render('signIn');
});

// accountRouter.route('/account').get(async (req, res) => {
//     try {
//         const existingUser = await signIn(req.query.email);
//         if (req.query.email === existingUser) {
//             res.render('account');
//         }
//         else {
//             console.log("different");
//             res.send("User with " + req.query.email + " email doesn't exist!");
//         };
//     } catch (error) {
//         debug(error.stack);
//     }
// });

accountRouter.post('/account', (async (req, res) => {
    try {
        console.log(req.body.email);
        const existingUser = await signIn(req.body.email);
        if (req.body.email === existingUser) {
            res.render('account');
        }
        else {
            console.log("different");
            res.send("User with " + req.body.email + " email doesn't exist!");
        };
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
        return response.email;
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