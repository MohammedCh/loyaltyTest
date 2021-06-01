const express = require('express')
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

//app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded. Used in the signUpRouter to retrieve the body from the form


app.get('/getByEmail/:email', (req, res) => {
    res.send(req.params.email);
});

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`);
});