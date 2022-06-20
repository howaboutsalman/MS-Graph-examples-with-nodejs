const axios = require('axios');

/**
 * Calls the endpoint with authorization bearer token.
 * @param {string} endpoint
 * @param {string} accessToken
 * @param {object} ReqBody
 */
async function getCall(endpoint, accessToken) {

    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };

    console.log('request made to web API at: ' + new Date().toString());

    try {
        const response = await axios.default.get(endpoint, options);
        return response.data;
    } catch (error) {
        console.log(error)
        return error;
    }
};

async function PostCall(endpoint, accessToken, ReqBody) {

    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
};

    console.log('request made to web API at: ' + new Date().toString());

    try {
        const response = await axios.default.get(endpoint, options).post(ReqBody);
        return response.data;
    } catch (error) {
        console.log(error)
        return error;
    }
};

module.exports = {
    getCall: getCall,
    PostCall: PostCall
};