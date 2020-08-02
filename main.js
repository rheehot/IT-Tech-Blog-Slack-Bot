const request = require('request');

// Setting & Config File
const config = require('./config/cofing.json');

console.log("====================================================================================");
console.log("Checking Webhook 🔥");
console.log(config['webhook']);
console.log("====================================================================================");

var headers = {
    'Content-type': 'application/json'
};

var dataString = '{"text":"Hello, World!"}';

var options = {
    url: config['webhook'],
    method: 'POST',
    headers: headers,
    body: dataString
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

request(options, callback);
console.log('\n🔥 CURL Request Complete 🔥');