const express = require('express')
const path = require('path');
const getUserBalance = require("./src/routers/getUserBalanceRouter");
const transactionRouter = require("./src/routers/transactionRouter");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded. Used in the signUpRouter to retrieve the body from the form


app.get('/getByEmail/:email', async (req, res) => {
    res.send(await getUserBalance.calculateUserBalance(req.params.email));
});

app.use('/transaction', transactionRouter);

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`);
});