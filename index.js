const puppeteer = require('puppeteer');
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
require('dotenv').config();

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(process.env.SITE_GOTO);
    await delay(1000);
    await page.waitForSelector('.cookie-consent__buttons-button.cookie-consent__buttons__close', { timeout: 5000 });
    await delay(1000);
    await page.click('.cookie-consent__buttons-button.cookie-consent__buttons__close');
    await delay(1000);

    await page.type('#login', process.env.SITE_USERNAME);
    await delay(1000);
    await page.type('#senha', process.env.SITE_PASSWORD); 
    await delay(1000);
    
    await page.click('#btn-entrar-sistema'); 
    await page.waitForNavigation();
    await delay(1000);

    const links = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('a.btn.btn-primary.btn-block'));
        return elements
            .filter(element => element.textContent.trim() === 'Acompanhar no mapa')
            .map(element => element.href);
    });

    console.log('Links encontrados:');
    if (links.length === 0) {
        console.log('Nenhum link encontrado.');
    } else {
        links.forEach((link, index) => {
            console.log(`${index + 1}: ${link}`);
        });
    }

    await browser.close();
})();