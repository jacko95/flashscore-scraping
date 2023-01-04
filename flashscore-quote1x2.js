const cheerio = require("cheerio");
// const axios = require("axios");
const fs = require("fs");
const json2csv = require("json2csv").Parser;
// var phantom = require('phantom');
// const puppeteer = require('puppeteer');
const playwright = require('playwright');


// const url = 'https://www.flashscore.it/partita/OxMbRqxi/#/comparazione-quote/quote-1x2/finale';
// const url = 'https://www.flashscore.it/partita/6J4ZMUp5/#/comparazione-quote/quote-1x2/finale';
// const url = 'https://www.flashscore.it/partita/nHbxcsRr/#/comparazione-quote/quote-1x2/finale';
const url = 'https://www.flashscore.it/partita/UuSBtMt2/#/comparazione-quote/quote-1x2/finale';
// const url = 'https://www.flashscore.it/partita/bHJOink3/#/comparazione-quote/quote-1x2/finale';
// const url = 'https://www.flashscore.it/partita/IeLg55J2/#/comparazione-quote/quote-1x2/finale';
// const url = 'https://www.flashscore.it/partita/hvJSj649/#/comparazione-quote/quote-1x2/finale';
// const url = 'https://www.flashscore.it/partita/xOOfBXog/#/comparazione-quote/quote-1x2/finale';
// const url = 'https://www.flashscore.it/partita/SKin76M2/#/comparazione-quote/quote-1x2/finale';

(async () => {
    const browser = await playwright.chromium/*firefox*//*webkit*/.launch({
        // headless: false,
        // slowMo: 500,
        // waitForInitialPage: true,
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url, {
        timeout: 0
    });

    // if(/*await*/ page.$("#onetrust-accept-btn-handler") !== null){
    //     await page.click("#onetrust-accept-btn-handler", {
    //         button: 'left',
    //         clickCount: 1,
    //         delay: 0,
    //     });
    // }
    //
    // while(await page.$("#live-table > div.event.event--results > div > div > a") !== null){
    //     await page.click("#live-table > div.event.event--results > div > div > a", {});
    // }
    const html = await page.content();

    // console.log(html)
    // console.log(url.slice(8).replace(/\//g, "____").replace(/____/g, "/").replace('www', 'https://www'))

    fs.writeFileSync(`./html/quote1x2/${url.slice(8).replace(/\//g, "____")}.html`, html)

    const $ = cheerio.load(html);
    // console.log($);

    let dataPartita = $("div.duelParticipant__startTime").first().text().split(' ')[0];
    let orarioPartita = $("div.duelParticipant__startTime").first().text().split(' ')[1];
    let squadraCasa = $("div.duelParticipant__home a.participant__participantName.participant__overflow").first().text();
    let squadraOspite = $("div.duelParticipant__away a.participant__participantName.participant__overflow").first().text();
    // let golCasa = $("div.detailScore__wrapper span").first().text();
    let golCasa = $("div.detailScore__wrapper span.detailScore__divider").first().prev().text();
    let golOspite = $("div.detailScore__wrapper span.detailScore__divider").first().next().text();
    console.log(dataPartita + '\n' + orarioPartita)
    console.log(squadraCasa + ' ' + golCasa + ' - ' + golOspite + ' ' + squadraOspite)

    // let bookmaker = $("a.oddsCell__odd").first()/*.parent()*/.prev().attr('title');
    let quota1 = parseFloat($("a.oddsCell__odd").first().text());
    let quota1Tooltip = parseFloat($("a.oddsCell__odd").first().attr('title').split(" ")[0]);
    let quotaX = parseFloat($("a.oddsCell__odd").first().next().text());
    let quotaXTooltip = parseFloat($("a.oddsCell__odd").first().next().attr('title').split(" ")[0]);
    let quota2 = parseFloat($("a.oddsCell__odd")/*.find("div.")*/.first().next().next().text());
    let quota2Tooltip = parseFloat($("a.oddsCell__odd").first().next().next().attr('title').split(" ")[0]);

    console.log('quote 1: ')
    console.log(quota1Tooltip)
    console.log(quota1)
    console.log('quote X: ')
    console.log(quotaXTooltip)
    console.log(quotaX)
    console.log('quote 2: ')
    console.log(quota2Tooltip)
    console.log(quota2)

    if(!isNaN(quota1Tooltip)){
        quota1 = quota1Tooltip;
    }
    if(!isNaN(quotaXTooltip)){
        quotaX = quotaXTooltip;
    }
    if(!isNaN(quota2Tooltip)){
        quota2 = quota2Tooltip;
    }

    console.log('')

    // console.log(bookmaker)
    console.log('quota 1: ' + quota1)
    // console.log('')
    console.log('quota X: ' + quotaX)
    // console.log('')
    console.log('quota 2: ' + quota2)

    console.log('\n')


    //todo: fare la media di tutte le quote presenti
    $("div.ui-table__row").each(function(i, element) {
        try {
            // console.log(i)
            let bookmaker = $(element).find("a.prematchLink").attr('title');
            let quota1 = parseFloat($(element).find("a.oddsCell__odd").text().slice(0, 4));
            let quota1Tooltip = parseFloat($(element).find("a.oddsCell__odd").attr('title').split(" ")[0]);
            let quotaX = parseFloat($(element).find("a.oddsCell__odd").next().text().slice(0, 4));
            let quotaXTooltip = parseFloat($(element).find("a.oddsCell__odd").next().attr('title').split(" ")[0]);
            let quota2 = parseFloat($(element).find("a.oddsCell__odd").first().next().next().text().slice(0, 4));
            let quota2Tooltip = parseFloat($(element).find("a.oddsCell__odd").next().next().attr('title').split(" ")[0]);

            // if(quota1.toString().length === 5){
            //     quota1 = parseFloat(quota1.toString().slice(0, 4))
            // }
            // else if(quota1.toString().length === 6){
            //     console.log(quota1.toString().slice(0, 4))
            //     quota1 = parseFloat(quota1.toString().slice(0, 5))
            // }
            //
            // if(quotaX.toString().length === 5){
            //     quotaX = parseFloat(quotaX.toString().slice(0, 4))
            // }
            // else if(quotaX.toString().length === 6){
            //     console.log(quotaX.toString().slice(0, 4))
            //     quotaX = parseFloat(quotaX.toString().slice(0, 5))
            // }
            //
            // if(quota2.toString().length === 5){
            //     quota2 = parseFloat(quota2.toString().slice(0, 4))
            // }
            // else if(quota2.toString().length === 6){
            //     console.log(quota2.toString().slice(0, 4))
            //     quota2 = parseFloat(quota2.toString().slice(0, 5))
            // }
            // console.log(quota1.toString().length)
            // console.log(quota1.toString().slice(0, 4))
            // console.log(quotaX.toString().length)
            // console.log(quotaX.toString().slice(0, 4))
            // console.log(quota2.toString().length)
            // console.log(quota2.toString().slice(0, 4))

            // console.log(quota1Tooltip)
            // console.log(quota1)
            // console.log('')
            // console.log(quotaXTooltip)
            // console.log(quotaX)
            // console.log('')
            // console.log(quota2Tooltip)
            // console.log(quota2)

            if(!isNaN(quota1Tooltip)){
                quota1 = quota1Tooltip;
            }
            if(!isNaN(quotaXTooltip)){
                quotaX = quotaXTooltip;
            }
            if(!isNaN(quota2Tooltip)){
                quota2 = quota2Tooltip;
            }

            // console.log('\n')

            console.log(bookmaker)
            console.log('quota 1: ' + quota1)
            console.log('quota X: ' + quotaX)
            console.log('quota 2: ' + quota2)
            // console.log('\n')
            console.log('')
        } catch (e) {
            // console.log(e)
        }

        // console.log('\n')
    })


    // let tooltip = await page.hover('a.oddsCell__odd', {
    //     force: true,
    // });
    // let tooltip = await page.locator('a.oddsCell__odd');
    // let tooltip = await page.locator('#oddsCell__odd');
    // console.log('tooltip');
    // console.log(tooltip/*.getText()*/);

    let c = 0;
    let partite = [];

    // console.log(partite)
    // console.log(partite[partite.length-1])
    // console.log(partite.length)

    //todo: estrappolare le squadre dalle partite


    await browser.close();
})();

