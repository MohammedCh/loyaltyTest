const express = require('express')
const path = require('path');
const signUpRouter = require('./src/routers/signUpRouter.js');
const accountRouter = require('./src/routers/accountRouter.js');

const app = express();
const PORT = process.env.PORT || 3000;

//app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded. Used in the signUpRouter to retrieve the body from the form

//code for serving static files
app.use(express.static(path.join(__dirname, '/public/')));

//enables template engines, like ejs or pug
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/signUp', signUpRouter);
app.use('/signIn', accountRouter);

app.get('/', (req, res) => {
    res.render('index', { balance: 1 });
});

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`);
});