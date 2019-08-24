const fs = require('fs');
const puppeteer = require('puppeteer');
(async ()=> {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://www.off---white.com/en/NL/men/t/seasons/fw-2019');
    const brandNames = await page.$$eval('article.product div.brand-name', arr => {
        return Array.from(arr).map(each => {
            return each.innerText
        
        });
    });
    

    await browser.close();
    
    // scenario 1: check if file exists
    let contents
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
})();


/*
1. no file
    - write array to new file
2. file exists, same contents
    - do nothing
3. file exists, different contents
    - send notification
    - overwrite with new content
*/