
const fs = require('fs');
const puppeteer = require('puppeteer');
const accountSid = process.env.ACCOUNT_SID; 
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken); 


async function run() {
    check();
    setTimeout(() => {
        run();
    }, 5000);
};
async function check(){
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox', 'disable-setuid-sandbox'
        ],
        headless: false
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36');
    await page.goto('https://www.off---white.com/en/NL/men/t/seasons/fw-2019');
    const brandNames = await page.$$eval('article.product div.brand-name', arr => {
        return Array.from(arr).map(each => {
            return each.innerText
        });
    });
    await browser.close();

    let contents
    // scenario 1: check if file exists
    try {
        contents = fs.readFileSync("brandname.txt", {
            encoding: 'utf8'
        });
    } catch (err) {
        // file does not exist
        console.log('File does not exist; writing new file')
        fs.writeFileSync("brandname.txt", brandNames.toString());
        return
    }

    // scenario 2: file exists, same contents
    if(contents === brandNames.toString()){
        return
    }

    if(brandNames.toString == null){

    }
    if(contents !== brandNames.toString()){
        //To do send notification.
    client.messages 
      .create({ 
         body: 'A product is updated. Please check off---white.com', 
         from: '+3197014201884',       
         to: '+31625322775‎'
       }) 
      .then(message => console.log(message.sid)) 
      .done();
    client.messages 
      .create({ 
         body: 'This message is test message', 
         from: '+3197014201884',       
         to: '+31638361771'
       }) 
      .then(message => console.log(message.sid)) 
      .done();


        fs.writeFileSync("brandname.txt", brandNames.toString());
    }
}


run();


/*
1. no file
    - write array to new file
2. file exists, same contents
    - do nothing
3. file exists, different contents
    - send notification
    - overwrite with new content
*/