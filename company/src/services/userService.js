const axios = require('axios');

function userService() {

    // try {
    //     const response = await axios.get('https://swapi.dev/api/people/1/');
    //     console.log(response.data);
    // } catch (error) {
    //     console.error(error);
    // }

    async function getUserBalanceByEmail(email) {
        try {
            const response = await axios.get('http://localhost:8000/getByEmail/' + email);
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
            const response = await axios.post('http://localhost:8000/transaction/add', { email: email, receiptId: receiptId, paid: paid });

            console.log(response);
            if (response) {
                return response;
            };
        } catch (error) {
            console.error(error);
        }
    }
    //addTransaction("helloword1", "5", "200");
    //function getUserByEmail(email) {
    //     const options = {
    //         host: 'swapi.dev',
    //         path: '/api/people/1',
    //         port: 80,
    //         method: 'GET'
    //     }

    //     const request = http.request(options, function (response) {
    //         var body = ""
    //         response.on('data', function (data) {
    //             body += data;
    //         });
    //         response.on('end', function () {
    //             //res.send(JSON.parse(body));
    //             console.log(body);
    //         });
    //     });
    //     request.on('error', function (e) {
    //         console.log('Problem with request: ' + e.message);
    //     });
    //     request.end();
    // }
    return { getUserBalanceByEmail, addTransaction };
};

module.exports = userService();