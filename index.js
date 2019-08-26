
const fs = require('fs');
const puppeteer = require('puppeteer');

async function run() {
    check();
    setTimeout(() => {
        run();
    }, 50000);
};

async function check(){
    const browser = await puppeteer.launch({
        args: [
            '--incognito',
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
        console.log('contents are the same');
        return
    }
    if(contents !== brandNames.toString()){
        //To do send notification.
        console.log('contents are different');
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