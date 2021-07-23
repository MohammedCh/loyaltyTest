const express = require('express');
const msal = require('@azure/msal-node');
const debug = require('debug')('app:signUoRouter');
const { MongoClient } = require('mongodb');
const userService = require('../services/userService');

const accountRouter = express.Router();

const config = {
    auth: {
        clientId: "96634340-0077-4663-b1cc-17cd775732e2",
        authority: "https://login.microsoftonline.com/common",
        clientSecret: "kj_0W77N2z2.JQN_OS2cqH~2ZSb~OYR7s6"
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};
// Create msal application object
const cca = new msal.ConfidentialClientApplication(config);
accountRouter.route('/').get((req, res) => {
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: "http://localhost:4000/signIn/redirect",
    };

    // get url to sign user in and consent to scopes needed for application
    cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
    }).catch((error) => console.log(JSON.stringify(error)));
});

let email = "legikol908@activesniper.com";

accountRouter.get('/redirect', (async (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ["user.read"],
        redirectUri: "http://localhost:4000/signIn/redirect",
    };
    cca.acquireTokenByCode(tokenRequest).then(async (response) => {
        console.log("\nResponse: \n:", response);
        const userInfo = await userService.getUserBalanceByEmail(email);
        res.render('account', { email, balance: userInfo.balance });
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    });
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