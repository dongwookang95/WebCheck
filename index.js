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
    console.log(brandNames);
    

    await browser.close();
})();