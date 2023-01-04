const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const json2csv = require("json2csv").Parser;
var phantom = require('phantom');
const puppeteer = require('puppeteer');
const playwright = require('playwright');


(async () => {
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.flashscore.it/partita/YJauta55/#/classifiche/table/overall');
    // await page.goto('https://www.flashscore.it/partita/noIeFRKC/#/classifiche/table/overall');
    const html = await page.content();

    // console.log(html)
    fs.writeFileSync("./flashscore-match.html", html)

    const $ = cheerio.load(html);
    // console.log($);

    // let league = $("div[title=Spagna] span.event__title--type").first().text().trim()
    // let match = $("div.event__match.event__match--scheduled.event__match--twoLine").text().trim()
    // let homeGoal = $("div.event__score.event__score--home").text().trim()
    // let awayGoal = $("div.event__score.event__score--away").text().trim()
    // let minutesMatch = $("div.event__stage--block").text().trim()
    // let leagueName = $("span.event__title--name").text().trim()
    // let leagueType = $("span.event__title--type").text().trim()
    // let matchId1 = $(`div[title="Clicca per i dettagli dell'incontro!"]`).text()/*.trim()*/
    // let matchId2 = $(`div[title="Clicca per i dettagli dell'incontro!"]`).attr('id')/*.trim()*/
    // let matchId3 = $(`div[class="event__match event__match--twoLine"]`).text()/*.trim()*/

    // let row = $("div.ui-table__row").text().trim()
    // let selectedRow = $("div.ui-table__row.table__row--selected").text().trim()
    // let position = $("span.table__cell.table__cell--value").text().trim()
    // let ranking = $("div.ui-table__row").attr('id')

    let homeTeam = $("a.participant__participantName.participant__overflow").first().text().trim()
    let awayTeam = $("a.participant__participantName.participant__overflow").last().text().trim()
    console.log(homeTeam + ' - ' + awayTeam + '\n');

    // $("a.participant__participantName.participant__overflow").each(function(i, element) {
    //     let participant = $(element).text()/*.trim()*/;
    //     console.log(participant + ' - ');
    // });

    let c = 0;
    $("div.ui-table__row.table__row--selected").each(function(i, element) {
    // $("div.ui-table__row").each(function(i, element) {
    //     console.log(c)
        // console.log($(element).text())

        // console.log($(element).attr('id')/*.slice(4)*/)
        // console.log($(element).attr('class'))
        // console.log($(element).parent().text())
        // console.log($(element).attr('href'))

        let position = parseInt($(element).find("div.tableCellRank").text().split('.')[0]);
        let team = $(element).find("div.table__cell.table__cell--participant").text();
        let diff = $(element).find("span.table__cell.table__cell--value.table__cell--score").text();
        let golFatti = parseInt(diff.split(':')[0])
        let golSubiti = parseInt(diff.split(':')[1])
        let results = $(element).find("span.table__cell.table__cell--value").text();
        let points = parseInt($(element).find("span.table__cell.table__cell--value.table__cell--points").text());
        let form = $(element).find("div.table__cell.table__cell--form").text();

        console.log('team: ' + team)
        console.log('position: ' + position);
        console.log('points: ' + points)
        console.log('gol fatti: ' + golFatti)
        console.log('gol subiti: ' + golSubiti)

        // console.log('results (PG V N P): ' + results.split(diff)[0])
        // console.log(results.split(diff)[0].length)
        if(results.split(diff)[0].length >= 5){
            console.log('results (PG V N P): ' + results.split(diff)[0].substring(0, 2) + ' ' + results.split(diff)[0].substring(2, results.split(diff)[0].length))
        }
        else {
            console.log('results (PG V N P): ' + results.split(diff)[0].substring(0, 1) + ' ' + results.split(diff)[0].substring(1, 2) + ' ' + results.split(diff)[0].substring(2, 3) + ' ' + results.split(diff)[0].substring(3, results.split(diff)[0].length))
        }

        //todo: contare i punti con un ciclo e if === VNP e una variabile conta

        console.log('forma: ' + form)
        // console.log($(element).find("div.tableCellFormIcon").attr('title')/*.text()*/)

        console.log('\n')

        c++;
    })

    // c = 0;
    // $("div.tableCellFormIcon").each(function(i, element) {
    //     console.log(c)
    //     // console.log($(element).text())
    //
    //     // console.log($(element).parent().parent().text())
    //     console.log($(element).parent().parent().find("div.tableCellRank").text())
    //     console.log($(element).parent().parent().find("div.table__cell.table__cell--participant").text())
    //     console.log($(element).parent().parent().find("span.table__cell.table__cell--value.table__cell--score").text())
    //     console.log($(element).parent().parent().find("span.table__cell.table__cell--value.table__cell--points").text())
    //     console.log($(element).parent().parent().find("div.table__cell.table__cell--form").text())
    //
    //     // console.log($(element).parent().parent().find("div.tableCellFormIcon").attr('title').slice(3))
    //
    //     // console.log($(element).attr('id')/*.slice(4)*/)
    //     // console.log($(element).attr('class'))
    //     // console.log($(element).parent().text())
    //     // console.log($(element).attr('href'))
    //
    //     console.log($(element).find("div.wld").text())
    //
    //     // console.log($(element).attr('title'))
    //     // console.log($(element).attr('title').split("]")/*.split("&nbsp;[/b]")*/)
    //     if($(element).find("div.wld").text() === '?'){
    //         console.log($(element).attr('title').split("\n"))
    //     }
    //     else {
    //         console.log($(element).attr('title').split("\n")[1])
    //         console.log($(element).attr('title').split("\n")[0].slice(3).split("&nbsp;[/b]")[1].substring(1, ))
    //         console.log($(element).attr('title').split("\n")[0].slice(3).split("&nbsp;[/b]")[0])
    //     }
    //     // console.log($(element).attr('title').split("\n"))
    //     // console.log($(element).attr('title').split("\n")[1])
    //     // console.log($(element).attr('title').split("\n")[0].slice(3).split("&nbsp;[/b]"))
    //     // // console.log($(element).attr('title').slice(3).split("&nbsp;[/b]"))
    //
    //     c++;
    //     console.log('\n')
    // })

    await browser.close();
})();

