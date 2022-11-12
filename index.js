const puppeteer = require("puppeteer");

async function run() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto("https://www.emiyaconsulting.com");

	await page.screenshot({ path: "emiya.png", fullPage: true });
	// await page.pdf({ path: "example.pdf", fullPage: true });

	await browser.close();
}

run();
