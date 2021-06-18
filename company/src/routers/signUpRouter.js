const express = require('express');
const debug = require('debug')('app:signUoRouter');
const { MongoClient } = require('mongodb');

const signUpRouter = express.Router();

signUpRouter.route('/').get((req, res) => {
    res.render('signUp');
});


signUpRouter.route('/saveUser').post(async (req, res) => {
    try {
        await signUp(req.body.email);
        res.send("new user signed up: " + JSON.stringify(newUser));
    } catch (error) {
        debug(error.stack);
    }
});

let newUser;

async function signUp(email) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'users';
    let client;
    let db;
    try {
        client = await MongoClient.connect(url);
        debug('Connected to mongo DB');

        db = client.db(dbName);

        document = { email: email };
        const response = await db.collection('users').insert(document);
        //res.json(response);
        newUser = response;

    } catch (error) {
        debug(error.stack);
    }
    finally {
        const admin = client.db(dbName).admin();
        //await client.db('users').dropDatabase(); //deletes database so we can run it again, without over populating it
        //console.log(await admin.listDatabases());
        client.close(); // ends node session when work is done
    }
}

//signUp("helloword1@email.com")


module.exports = signUpRouter;
