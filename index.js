// const cheerio = require("cheerio");
// const axios = require("axios");
// const fs = require("fs");
// const json2csv = require("json2csv").Parser;
// const playwright = require('playwright');
//
//
//
// const baseUrl = 'https://books.toscrape.com/catalogue/category/books/mystery_3/';
// const homeUrl = baseUrl + 'index.html';
// let bookData = [];
//
//
// async function getBooks(url) {
//     axios({
//         method: 'GET',
//         url: url,
//         params: {
//             //  "h2h": "1706-1707",
//             // "fixture": 952065,
//         },
//         headers: {
//             // 'x-apisports-key': 'de08c0027d7773a9294e0880fd961852',
//             // 'x-apisports-key': process.env.API_SPORTS_KEY,
//             // 'x-rapidapi-key': 'XxXxXxXxXxXxXxXxXxXxXxXx',
//             // 'x-rapidapi-host': 'v3.football.api-sports.io'
//         }
//     }).then(function (response) {
//         // console.log(JSON.stringify(response.data));
//
//         const $ = cheerio.load(response.data);
//         const genre = $("h1").text();
//         console.log(genre)
//
//         const books = $("article");
//         // console.log(books)
//
//         books.each(function () {
//             let title = $(this).find("h3 a").text()
//             let price = $(this).find(".price_color").text()
//             let stock = $(this).find(".availability").text().trim()
//
//             bookData.push({title, price, stock})
//
//             // console.log(bookData)
//         });
//
//         if($(".next a").length > 0){
//             let nextPage = baseUrl + $(".next a").attr("href");
//             getBooks(nextPage);
//         }
//         else {
//             const parser = new json2csv();
//             const csv = parser.parse(bookData);
//             fs.writeFileSync("./books.csv", csv)
//         }
//
//         console.log(bookData)
//
//     }).catch(function (error) {
//         console.log(error);
//     });
// }
//
// async function getProducts() {
//     axios({
//         method: 'GET',
//         url: "https://www.amazon.it/dp/B00PUOHBBC",
//         // params: {
//         //  "h2h": "1706-1707",
//         // "fixture": 952065,
//         // },
//         headers: {
//             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
//         }
//     }).then(async function (response) {
//         const html = response.data;
//
//         // console.log(JSON.stringify(response.data));
//         // console.log(html);
//
//         const $ = cheerio.load(html);
//         // console.log($);
//
//         const productInfo = [
//             {
//                 title: $("span#productTitle").text().trim(),
//                 price: $("span[data-a-color=price] span.a-offscreen").first().text()/*.trim()*/,
//                 ratings: $("span#acrCustomerReviewText").first().text()/*.trim()*/,
//             }
//         ];
//
//         console.log(productInfo)
//
//         // const books = $("article");
//
//     }).catch(function (error) {
//         console.log(error);
//     });
// }
//
// // getBooks(homeUrl);
// // getProducts();
//
// async function flashScoreScraper() {
//     axios({
//         method: 'GET',
//         url: "https://www.flashscore.it/",
//         // url: "https://www.flashscore.it/partita/YJauta55/#/informazioni-partita",
//         // url: "https://www.flashscore.com/football",
//         // params: {
//         //  "h2h": "1706-1707",
//         // "fixture": 952065,
//         // },
//         headers: {
//             // 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//             // 'Accept-Encoding': 'gzip, deflate, br',
//             // 'Accept-Language': 'en-US,en;q=0.9',
//             // 'Sec-Ch-Ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
//             // 'Sec-Ch-Ua-Mobile': '?0',
//             // 'Sec-Fetch-Dest': 'document',
//             // 'Sec-Fetch-Mode': 'navigate',
//             // 'Sec-Fetch-Site': 'none',
//             // 'Sec-Fetch-User': '?1',
//             // 'Upgrade-Insecure-Requests': '1',
//             // 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
//             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
//         }
//     }).then(async function (response) {
//         const html = response.data;
//
//         // console.log(JSON.stringify(response.data));
//         console.log(html);
//
//         const $ = cheerio.load(html);
//         // console.log($);
//
//         // const productInfo = [
//         //     {
//         //         title: $("span#productTitle").text().trim(),
//         //         price: $("span[data-a-color=price] span.a-offscreen").first().text()/*.trim()*/,
//         //         ratings: $("span#acrCustomerReviewText").first().text()/*.trim()*/,
//         //     }
//         // ];
//         //
//         // console.log(productInfo)
//
//         // const books = $("article");
//
//     }).catch(function (error) {
//         console.log(error);
//     });
// }
//
// // flashScoreScraper();
//
// // phantom.create(function (ph) {
// //     ph.createPage(function (page) {
// //         page.open("https://www.flashscore.it/", function (status) {
// //             page.evaluate(function () {
// //                 return document.getElementById('g_1_UJzOgxfc');
// //             }, function (result) {
// //                 console.log('element is:' + result);
// //                 ph.exit();
// //             });
// //          });
// //     });
// // }).then(async function (response) {
// //     console.log(response)
// // });
//
// // async function getVisual() {
// //     try {
// //         const URL = 'https://www.flashscore.it/'
// //         const browser = await puppeteer.launch()
// //
// //         const page = await browser.newPage()
// //         await page.goto(URL)
// //
// //         console.log(page)
// //
// //         // await page.screenshot({ path: 'screenshot.png' })
// //         // await page.pdf({ path: 'page.pdf' })
// //
// //         await browser.close()
// //     } catch (error) {
// //         console.error(error)
// //     }
// // }
// //
// // getVisual()
//
// // (async () => {
// //     // 'webkit' is also supported, but there is a problem on Linux
// //     for (const browserType of ['chromium', 'firefox']) {
// //         const browser = await playwright[browserType].launch();
// //         const context = await browser.newContext();
// //         const page = await context.newPage();
// //         await page.goto('https://www.flashscore.it/');
// //         console.log(await page.locator('pre').textContent());
// //         await browser.close();
// //     }
// // })();
//
// (async () => {
//     const browser = await playwright.chromium.launch();
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto('https://www.flashscore.it/');
//     // await page.goto('https://www.flashscore.it/partita/YJauta55/#/informazioni-partita');
//     const html = await page.content();
//
//     // console.log(html)
//     fs.writeFileSync("./flashscore.html", html)
//
//     const $ = cheerio.load(html);
//     // console.log($);
//
//     let league = $("div[title=Spagna] span.event__title--type").first().text().trim()
//     let match = $("div.event__match.event__match--scheduled.event__match--twoLine").text().trim()
//     let homeGoal = $("div.event__score.event__score--home").text().trim()
//     let awayGoal = $("div.event__score.event__score--away").text().trim()
//     let minutesMatch = $("div.event__stage--block").text().trim()
//     let leagueName = $("span.event__title--name").text().trim()
//     let leagueType = $("span.event__title--type").text().trim()
//     let match1 = $("div.event__match.event__match--scheduled.event__match--last.event__match--twoLine").text().trim()
//     let matchId = $("div.event__match.event__match--twoLine").attr('id')
//
//     let matchId1 = $(`div[title="Clicca per i dettagli dell'incontro!"]`).text()/*.trim()*/
//     let matchId2 = $(`div[title="Clicca per i dettagli dell'incontro!"]`).attr('id')/*.trim()*/
//
//     let matchId3 = $(`div[class="event__match event__match--twoLine"]`).text()/*.trim()*/
//
//     // console.log(minutesMatch);
//
//     let c = 0;
//     // $(`div[title="Clicca per i dettagli dell'incontro!"]`).each(function(i, element) {
//     $("div.event__match--scheduled").each(function(i, element) {
//     // $("div.event__match.event__match--twoLine").each(function(i, element) {
//         console.log(c)
//         console.log($(element).text())
//         console.log($(element).attr('id').slice(4))
//         console.log($(element).attr('class'))
//         // console.log($(element).parent().text())
//         // console.log($(element).attr('href'))
//         c++;
//     })
//
//     c = 0;
//     // $("span.event__title--type").each(function(i, element) {
//     $("div.event__header").each(async function(i, element) {
//         console.log(c)
//         console.log($(element).text().substr(0, $(element).text().length - 11))
//         // console.log($(element).parent().next().text())
//         // console.log($(element).attr('id')/*.slice(4)*/)
//         console.log($(element).attr('class'))
//         // console.log($(element).attr('href'))
//
//         // while($(element).next().attr('class') !== 'event__header'){
//             console.log($(element).next().text())
//             console.log($(element).next().attr('id'))
//             console.log($(element).next().attr('class'))
//
//             // const detailBrowser = await playwright.chromium.launch();
//             // const detailContext = await detailBrowser.newContext();
//             // const detailPage = await detailContext.newPage();
//             // await detailPage.goto(`https://www.flashscore.it/partita/${$(element).next().attr('id').slice(4)}/#/informazioni-partita`);
//             // const detailPageHtml = await detailPage.content();
//             // const a = cheerio.load(detailPageHtml);
//             // console.log(detailPageHtml)
//         // }
//
//         c++;
//     })
//
//
//     // const productInfo = [
//     //     {
//     //         title: $("span#productTitle").text().trim(),
//     //         price: $("span[data-a-color=price] span.a-offscreen").first().text()/*.trim()*/,
//     //         ratings: $("span#acrCustomerReviewText").first().text()/*.trim()*/,
//     //     }
//     // ];
//     //
//     // console.log(productInfo)
//
//     await browser.close();
// })();
//
