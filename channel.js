const puppeteer = require('puppeteer');

async function sendToChannel(message) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://web.whatsapp.com/channel/0029VbBY5Dx5fM5TVXdztD3D');

  await page.waitForSelector('canvas[aria-label="Scan me!"]', { timeout: 0 });
  console.log('Scan QR code to login');

  await page.waitForSelector('div[contenteditable="true"]', { timeout: 0 });
  await page.type('div[contenteditable="true"]', message);
  await page.keyboard.press('Enter');

  await browser.close();
}
