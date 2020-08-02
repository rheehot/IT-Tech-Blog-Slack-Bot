const request = require('request');
const puppeteer = require('puppeteer');
const fs = require('fs');

// Setting & Config File
const config = require('./config/cofing.json');
// Save Data
const document = require('./main.json');

console.log("====================================================================================");
console.log("Checking Webhook 🔥");
console.log(config['webhook']);
console.log("====================================================================================");

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto('https://engineering.linecorp.com/ko/blog/');
    await page.waitFor(1000);
    await page.setViewport({
        width: 1920,
        height: 1080
    });

    let data = {};

    let temp = await page.$("#post-62382 > div > header > div > h2 > a");

    data.name = await page.evaluate((data) => {
        return data.textContent;
    }, temp);

    data.link = await page.evaluate((data) => {
        return data.href;
    }, temp);
    console.log("Crawling Complete 🔥");
    console.log(data);
    var DataJSON = JSON.stringify(data);
    fs.writeFileSync('main.json', DataJSON);
    console.log("Save to another file completed 👍");
    await browser.close();
})();

var headers = {
    'Content-type': 'application/json'
};

var dataString = `{"text":"${document['name']}\n ${document['link']}"}`;

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