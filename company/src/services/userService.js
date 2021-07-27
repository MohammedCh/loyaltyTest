const axios = require('axios');
const http = require("http");

function userService() {

    // try {
    //     const response = await axios.get('https://swapi.dev/api/people/1/');
    //     console.log(response.data);
    // } catch (error) {
    //     console.error(error);
    // }

    const callWebApi = (email, accessToken, callback) => {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        };

        const req = http.request(new URL("http://localhost:5000/getByEmail/" + email), options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                callback(chunk);
            });
            if (req) {
                return req.data;
            };
        });
        req.on('error', (err) => {
            console.log(err);
        });
        req.end();
    }

    async function getUserBalanceByEmail(email) {
        try {
            const response = await axios.get('http://localhost:5000/getByEmail/' + email);
            //console.log(response.data);
            if (response) {
                return response.data;
            };
        } catch (error) {
            console.error(error);
        }
    }

    async function addTransaction(email, receiptId, paid) {
        try {
            const response = await axios.post('http://localhost:5000/transaction/add', { email: email, receiptId: receiptId, paid: paid });
            if (response) {
                return response;
            };
        } catch (error) {
            console.error(error);
        }
    }

    return { getUserBalanceByEmail, addTransaction, callWebApi };
};

module.exports = userService();