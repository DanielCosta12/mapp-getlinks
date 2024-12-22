import puppeteer from 'puppeteer';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(process.env.SITE_GOTO,{ timeout: 60000 });
    await delay(1000);
    await page.waitForSelector('.cookie-consent__buttons-button.cookie-consent__buttons__close', { timeout: 60000 });
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
        await browser.close();
        return; 
    } else {
        links.forEach((link, index) => {
            console.log(`${index + 1}: ${link}`);
        });
    }

    const messageBody = `Prezados, bom dia!\n Gostaria de compartilhar os links das rotas dos motoboys:\n${links.join('\n')}`;
    const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    const params = {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: messageBody
    };

    const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
    });
    const data = await response.json();
    if (data.ok) {
        console.log('Mensagem enviada');
    } else {
        console.log('ERROR', data.description);
    }
    await browser.close();
})();
