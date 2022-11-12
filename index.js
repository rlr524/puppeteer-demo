/**
 * Basic web scraping using Google's Puppeteer Node package, which is a headless browser built on Chromium
 * https://pptr.dev/
 * Puppeteer enables basic web scraping and has a fairly simple API
 * More complex scraping or thorough app testing will typically entail a more robust tool like Selenium
 * This example scrapes basic vanilla HTML/JS sites. Scraping SPAs will require additional
 * Puppeteer methods such as waitForSelector(). Additionally, scraping that requires iterations
 * through multiple pages, searches, or authentication will add additional complexity and Puppeteer's docs
 * should be referenced.
 */
const fs = require("fs");
const puppeteer = require("puppeteer");

async function run() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const traversy = await browser.newPage();
	await page.goto("https://www.emiyaconsulting.com");
	await traversy.goto("https://www.traversymedia.com");

	// await page.screenshot({ path: "emiya.png", fullPage: true });
	// await page.pdf({ path: "example.pdf", fullPage: true });

	// const html = await page.content();
	// console.log(html);

	// const title = await page.evaluate(() => document.title);
	// console.log(title);

	// const text = await page.evaluate(() => document.body.innerText);
	// console.log(text);

	// const links = await page.evaluate(() =>
	// 	Array.from(document.querySelectorAll("a"), (e) => e.href)
	// );
	// console.log(links);

	// const courses = await traversy.evaluate(() =>
	// 	Array.from(document.querySelectorAll("#courses .card"), (e) => ({
	// 		title: e.querySelector(".card-body h3").innerText,
	// 		level: e.querySelector(".card-body .level").innerText,
	// 		url: e.querySelector(".card-footer a").href,
	// 		promocode: e.querySelector(".card-footer .promo-code .promo")
	// 			.innerText,
	// 	}))
	// );
	// console.log(courses);

	const coursesAlt = await traversy.$$eval("#courses .card", (elements) =>
		elements.map((e) => ({
			title: e.querySelector(".card-body h3").innerText,
			level: e.querySelector(".card-body .level").innerText,
			url: e.querySelector(".card-footer a").href,
			promocode: e.querySelector(".card-footer .promo-code .promo")
				.innerText,
		}))
	);
	console.log(coursesAlt);
	// Save data as a JSON file
	fs.writeFile("courses.json", JSON.stringify(coursesAlt), (err) => {
		if (err) throw err;
		console.log("File saved");
	});

	await browser.close();
}

run();
