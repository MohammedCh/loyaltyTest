const axios = require('axios');

function userService() {

    // try {
    //     const response = await axios.get('https://swapi.dev/api/people/1/');
    //     console.log(response.data);
    // } catch (error) {
    //     console.error(error);
    // }

    async function getUserByEmail(email) {
        try {
            const response = await axios.get('localhost:8000/getByEmail/' + email);
            console.log("hi");
            console.log(response.response);
        } catch (error) {
            console.error(error);
        }
    }



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
    return { getUserByEmail };
};

module.exports = userService();