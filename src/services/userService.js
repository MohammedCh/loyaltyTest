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

    return { getUserBalanceByEmail, addTransaction };
};

module.exports = userService();