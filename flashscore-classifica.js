const cheerio = require("cheerio");
// const axios = require("axios");
const fs = require("fs");
const json2csv = require("json2csv").Parser;
const playwright = require('playwright');
const officegen = require('officegen');


const officegenDocx = officegen('docx');
let pObj = officegenDocx.createP();

// let url = 'https://www.flashscore.it/partita/YJauta55/#/classifiche/table/overall';
// let url = 'https://www.flashscore.it/partita/ADSQoJbE/#/classifiche/live';
// let url = 'https://www.flashscore.it/calcio/turchia/super-lig/classifiche';
// let url = 'https://www.flashscore.it/calcio/turchia/1-lig/classifiche/';
// let url = 'https://www.flashscore.it/calcio/italia/serie-a/classifiche';
// let url = 'https://www.flashscore.it/calcio/italia/serie-b/classifiche';
// let url = 'https://www.flashscore.it/calcio/portogallo/liga-portugal/classifiche/';
// let url = 'https://www.flashscore.it/calcio/francia/ligue-1/classifiche/';
// let url = 'https://www.flashscore.it/calcio/germania/bundesliga/classifiche/';
// let url = 'https://www.flashscore.it/calcio/inghilterra/premier-league/classifiche/';
// let url = 'https://www.flashscore.it/calcio/romania/liga-1/classifiche/';
// let url = 'https://www.flashscore.it/calcio/romania/liga-2/classifiche/';
// let url = 'https://www.flashscore.it/calcio/argentina/liga-profesional/classifiche/';
// let url = 'https://www.flashscore.it/calcio/brasile/serie-a/classifiche/';
// let url = 'https://www.flashscore.it/calcio/brasile/serie-b/classifiche/';
// let url = 'https://www.flashscore.it/calcio/italia/serie-c-girone-a/classifiche/';
// let url = 'https://www.flashscore.it/calcio/italia/serie-c-girone-b/classifiche/';
// let url = 'https://www.flashscore.it/calcio/italia/serie-c-girone-c/classifiche/';
// let url = 'https://www.flashscore.it/calcio/tunisia/ligue-professionnelle/classifiche/'; // si sputtana
// let url = 'https://www.flashscore.it/calcio/egitto/premier-league/classifiche/';
// let url = 'https://www.flashscore.it/calcio/grecia/super-league/classifiche/';
// let url = 'https://www.flashscore.it/calcio/germania/2-bundesliga/classifiche/';
// let url = 'https://www.flashscore.it/calcio/olanda/eredivisie/classifiche/';
// let url = 'https://www.flashscore.it/calcio/spagna/laliga/classifiche/';
// let url = 'https://www.flashscore.it/calcio/spagna/laliga2/classifiche/';
let url = 'https://www.flashscore.it/calcio/svizzera/super-league/classifiche/';
// let url = 'https://www.flashscore.it/calcio/svezia/allsvenskan/classifiche/';
// let url = 'https://www.flashscore.it/calcio/giappone/j1-league/classifiche/';
// let url = 'https://www.flashscore.it/calcio/marocco/botola-pro/classifiche/';
// let url = 'https://www.flashscore.it/calcio/portogallo/liga-portugal-2/classifiche/';
// let url = 'https://www.flashscore.it/partita/noIeFRKC/#/classifiche/table/overall';

let classificheCampionati = [
    'https://www.flashscore.it/calcio/portogallo/liga-portugal/classifiche/',
    'https://www.flashscore.it/calcio/portogallo/liga-portugal-2/classifiche/',
    'https://www.flashscore.it/calcio/francia/ligue-1/classifiche/',
    'https://www.flashscore.it/calcio/germania/bundesliga/classifiche/',
    'https://www.flashscore.it/calcio/germania/2-bundesliga/classifiche/',
    'https://www.flashscore.it/calcio/inghilterra/premier-league/classifiche/',
    'https://www.flashscore.it/calcio/romania/liga-1/classifiche/',
    'https://www.flashscore.it/calcio/romania/liga-2/classifiche/',
    'https://www.flashscore.it/calcio/argentina/liga-profesional/classifiche/',
    'https://www.flashscore.it/calcio/brasile/serie-a/classifiche/',
    'https://www.flashscore.it/calcio/brasile/serie-b/classifiche/',
    'https://www.flashscore.it/calcio/italia/serie-a/classifiche',
    'https://www.flashscore.it/calcio/italia/serie-b/classifiche',
    'https://www.flashscore.it/calcio/italia/serie-c-girone-a/classifiche/',
    'https://www.flashscore.it/calcio/italia/serie-c-girone-b/classifiche/',
    'https://www.flashscore.it/calcio/italia/serie-c-girone-c/classifiche/',
    'https://www.flashscore.it/calcio/grecia/super-league/classifiche/',
    'https://www.flashscore.it/calcio/olanda/eredivisie/classifiche/',
    'https://www.flashscore.it/calcio/olanda/eerste-divisie/classifiche/',
    'https://www.flashscore.it/calcio/spagna/laliga/classifiche/',
    'https://www.flashscore.it/calcio/spagna/laliga2/classifiche/',
    'https://www.flashscore.it/calcio/svizzera/super-league/classifiche/',
    'https://www.flashscore.it/calcio/turchia/super-lig/classifiche/',
    'https://www.flashscore.it/calcio/turchia/1-lig/classifiche/',
    'https://www.flashscore.it/calcio/svezia/allsvenskan/classifiche/',
    'https://www.flashscore.it/calcio/danimarca/superliga/classifiche/',
    'https://www.flashscore.it/calcio/giappone/j1-league/classifiche/',
    'https://www.flashscore.it/calcio/marocco/botola-pro/classifiche/',
    'https://www.flashscore.it/calcio/colombia/primera-a/classifiche/',
];

// for(let k = 0; k < classificheCampionati.length; k++){
    (async () => {
        // let url = classificheCampionati[k];

        try {
            const browser = await playwright.chromium/*webkit*/.launch({
                headless: false,
                slowMo: 500,
                // waitForInitialPage: true,
                // timeout: 2147483647,
                // globalTimeout: 2147483647,
                // use: { navigationTimeout: 2147483647 }
            });
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto(url, {
                timeout: 0
            });

            if(await page.$("#onetrust-accept-btn-handler") !== null){
                await page.click("#onetrust-accept-btn-handler", {
                    button: 'left',
                    clickCount: 1,
                    delay: 0,
                });
            }
            // if(await page.$("#tournament-table-tabs-and-content > div.subTabs > div > a:nth-child(2)") !== null){
            //     await page.click("#tournament-table-tabs-and-content > div.subTabs > div > a:nth-child(2)", {
            //         button: 'left',
            //         clickCount: 1,
            //         delay: 0,
            //     });
            // }

            const html = await page.content();
            // console.log(html)

            const $ = cheerio.load(html);
            // console.log($);

            fs.writeFileSync(`./html/classifica/${url.slice(8).replace(/\//g, "____")}.html`, html)
            let generatedFile = fs.createWriteStream(`./doc/classifica/${url.slice(8).replace(/\//g, "____")}.docx`);
            // let generatedFile = fs.createWriteStream(`./doc/classifica/flashscore-classifiche.docx`);


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
            // let homeTeam = $("a.participant__participantName.participant__overflow").first().text().trim()
            // let awayTeam = $("a.participant__participantName.participant__overflow").last().text().trim()
            // console.log(homeTeam + ' - ' + awayTeam + '\n');
            // $("a.participant__participantName.participant__overflow").each(function(i, element) {
            //     let participant = $(element).text()/*.trim()*/;
            //     console.log(participant + ' - ');
            // });

            let squadre = [];
            let c = 0;
            // $("div.ui-table__row.table__row--selected").each(function(i, element) {
            $("div.ui-table__row").each(function(i, element) {
                // console.log(c)
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
                let punti = parseInt($(element).find("span.table__cell.table__cell--value.table__cell--points").text());
                let form = $(element).find("div.table__cell.table__cell--form").text();
                // let form = $(element).find("div.tableCellFormIcon").attr('title');
                // let tbd = $(element).find("div.wld.wld--tbd")/*.text()*/;
                // let tbd = $(element).find("div.tableCellFormIcon.tableCellFormIcon--TBD").attr('title')/*.text()*/;

                let formaPunti = 0;
                // console.log(form)
                for(let i = 0; i < form.length; i++){
                    // console.log(form.substring(i, i+1))
                    if(form.substring(i, i+1) === 'V'){
                        formaPunti += 3;
                    }
                    else if(form.substring(i, i+1) === 'N'){
                        formaPunti += 1;
                    }
                }
                // console.log(formaPunti)

                // console.log('\n')

                squadre.push({
                    team,
                    position,
                    partiteGiocate: results.split(diff)[0].length >= 5
                        ? parseInt(results.split(diff)[0].substring(0, 2) + ' ' + results.split(diff)[0].substring(2, results.split(diff)[0].length).split(' ')[0])
                        : parseInt(results.split(diff)[0].substring(0, 1) + ' ' + results.split(diff)[0].substring(1, 2) + ' ' + results.split(diff)[0].substring(2, 3) + ' ' + results.split(diff)[0].substring(3, results.split(diff)[0].length).split(' ')[0]),
                    punti,
                    golFatti,
                    golSubiti,
                    diffReti: golFatti - golSubiti,
                    results: results.split(diff)[0].length >= 5
                        ? results.split(diff)[0].substring(0, 2) + ' ' + results.split(diff)[0].substring(2, results.split(diff)[0].length)
                        : results.split(diff)[0].substring(0, 1) + ' ' + results.split(diff)[0].substring(1, 2) + ' ' + results.split(diff)[0].substring(2, 3) + ' ' + results.split(diff)[0].substring(3, results.split(diff)[0].length),
                    form,
                    // tbd: tbd.split("\n"),
                    formaPunti,
                    condizione: {},
                    forza: {},
                    prossimo: {},
                    forma: [],
                    posizioneCasa: 0,
                    partiteGiocateCasa: 0,
                    puntiCasa: 0,
                    golFattiCasa: 0,
                    golSubitiCasa: 0,
                    diffRetiCasa: 0,
                    risultatiCasa: '',
                    formaPuntiCasa: 0,
                    condizioneCasa: 0,
                    forzaCasa: 0,
                    formaCasa: [],
                    posizioneFuori: 0,
                    partiteGiocateFuori: 0,
                    puntiFuori: 0,
                    golFattiFuori: 0,
                    golSubitiFuori: 0,
                    diffRetiFuori: 0,
                    risultatiFuori: '',
                    formaPuntiFuori: 0,
                    condizioneFuori: 0,
                    forzaFuori: 0,
                    formaFuori: [],
                });

                // console.log('\n')

                c++;
            })

            // c = 0;
            // $("div.tableCellFormIcon").each(function(i, element) {
            //     console.log(c)
            //     // console.log($(element).text())
            //
            //     let position = parseInt($(element).parent().parent().find("div.tableCellRank").text().split('.')[0]);
            //     let team = $(element).parent().parent().find("div.table__cell.table__cell--participant").text();
            //     let diff = $(element).parent().parent().find("span.table__cell.table__cell--value.table__cell--score").text();
            //     let golFatti = parseInt(diff.split(':')[0])
            //     let golSubiti = parseInt(diff.split(':')[1])
            //     let results = $(element).parent().parent().find("span.table__cell.table__cell--value").text();
            //     let points = parseInt($(element).parent().parent().find("span.table__cell.table__cell--value.table__cell--points").text());
            //     let form = $(element).parent().parent().find("div.table__cell.table__cell--form").text();
            //
            //     // console.log(form.substring(0, 1))
            //     // if(form.substring(0, 1) === '?'){
            //     console.log('team: ' + team)
            //     console.log('position: ' + position);
            //     console.log('points: ' + points)
            //     console.log('gol fatti: ' + golFatti)
            //     console.log('gol subiti: ' + golSubiti)
            //
            //     // console.log('results (PG V N P): ' + results.split(diff)[0])
            //     // console.log(results.split(diff)[0].length)
            //     if(results.split(diff)[0].length >= 5){
            //         console.log('results (PG V N P): ' + results.split(diff)[0].substring(0, 2) + ' ' + results.split(diff)[0].substring(2, results.split(diff)[0].length))
            //     }
            //     else {
            //         console.log('results (PG V N P): ' + results.split(diff)[0].substring(0, 1) + ' ' + results.split(diff)[0].substring(1, 2) + ' ' + results.split(diff)[0].substring(2, 3) + ' ' + results.split(diff)[0].substring(3, results.split(diff)[0].length))
            //     }
            //
            //     console.log('forma: ' + form)
            //     // }
            //     // console.log($(element).find("div.tableCellFormIcon").attr('title')/*.text()*/)
            //
            //     // // console.log($(element).parent().parent().text())
            //     // console.log($(element).parent().parent().find("div.tableCellRank").text())
            //     // console.log($(element).parent().parent().find("div.table__cell.table__cell--participant").text())
            //     // console.log($(element).parent().parent().find("span.table__cell.table__cell--value.table__cell--score").text())
            //     // console.log($(element).parent().parent().find("span.table__cell.table__cell--value.table__cell--points").text())
            //     // console.log($(element).parent().parent().find("div.table__cell.table__cell--form").text())
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

            c = 0;
            let prossimePartite = [];
            let formaPartite = [];
            $("div.tableCellFormIcon").each(function(i, element) {
                // console.log(c)
                // console.log($(element).parent().parent().text());
                // console.log($(element).text());

                let dataPartita;
                let nomeSquadraCasa;
                let nomeSquadraOspite;
                let golCasa;
                let golOspite;
                // let posizioneSquadraCasa;
                // let posizioneSquadraOspite;
                let squadraCasa;
                let squadraOspite;

                if($(element).text() === '?'){
                    dataPartita = $(element).attr('title').split("\n")[2].trim();
                    nomeSquadraCasa = $(element).attr('title').split("\n")[1].split(' - ')[0].trim();
                    nomeSquadraOspite = $(element).attr('title').split("\n")[1].split(' - ')[1].trim();

                    // console.log(dataPartita)
                    // console.log(squadraCasa + ' - ' + squadraOspite)

                    squadre.forEach(function(element) {
                        if(element.team === nomeSquadraCasa){
                            // posizioneSquadraCasa = element.position;
                            squadraCasa = element;
                        }
                        else if(element.team === nomeSquadraOspite){
                            // posizioneSquadraOspite = element.position;
                            squadraOspite = element;
                        }
                    })

                    prossimePartite.push({
                        dataPartita,
                        nomeSquadraCasa,
                        nomeSquadraOspite,
                        squadraCasa,
                        squadraOspite,
                        quote: []
                    });
                }
                else {
                    dataPartita = $(element).attr('title').split('\n')[1].trim();
                    nomeSquadraCasa = $(element).attr('title').split('\n')[0].split('&nbsp;[/b]')[1].slice(1, -1).split(' - ')[0];
                    nomeSquadraOspite = $(element).attr('title').split('\n')[0].split('&nbsp;[/b]')[1].slice(1, -1).split(' - ')[1];
                    golCasa = parseInt($(element).attr('title').split('\n')[0].split('&nbsp;[/b]')[0].slice(3).split(':')[0]);
                    golOspite = parseInt($(element).attr('title').split('\n')[0].split('&nbsp;[/b]')[0].slice(3).split(':')[1])

                    squadre.forEach(function(element) {
                        if(element.team === nomeSquadraCasa){
                            // posizioneSquadraCasa = element.position;
                            squadraCasa = element;
                        }
                        else if(element.team === nomeSquadraOspite){
                            // posizioneSquadraOspite = element.position;
                            squadraOspite = element;
                        }
                    })

                    // console.log(dataPartita);
                    // console.log(squadraCasa + '(' + posizioneSquadraCasa + ')' + ' ' + golCasa + ' - ' + golOspite + ' ' + squadraOspite + '(' + posizioneSquadraOspite + ')');
                    // console.log(posizioneSquadraCasa);
                    // console.log(posizioneSquadraOspite);

                    // console.log($(element).attr('title').split('\n'));
                    // console.log($(element).attr('title').split('\n')[1]);
                    // console.log($(element).attr('title').split('\n')[0].split('&nbsp;[/b]')[1].slice(1, -1).split(' - '));
                    // // console.log($(element).attr('title').split('\n')[0].split('&nbsp;[/b]')[1].split(' - ')[0]);
                    // // console.log($(element).attr('title').split('\n')[0].split('&nbsp;[/b]')[1].split(' - ')[1]);
                    // console.log($(element).attr('title').split('\n')[0].split('&nbsp;[/b]')[0].slice(3));
                    // console.log($(element).attr('title').split('\n')[0].split('&nbsp;[/b]')[0].slice(3).split(':'));

                    formaPartite.push({
                        dataPartita,
                        nomeSquadraCasa,
                        nomeSquadraOspite,
                        squadraCasa,
                        squadraOspite,
                        golCasa,
                        golOspite,
                    });
                }

                // console.log($(element).attr('title'))
                // console.log('\n')

                c++;
            })

            for(let i = 0; i < squadre.length; i++){
                for(let j = i * 5; j < (i+1) * 5; j++){
                    squadre[i].forma.push(formaPartite[j]);
                }
            }

            for(let i = 0; i < squadre.length; i++){
                squadre[i].prossimo = prossimePartite[i];
            }

            console.log(await page.innerText(`#tournament-table-tabs-and-content > div.subTabs > div > a:nth-child(2)`));
            if(await page.innerText(`#tournament-table-tabs-and-content > div.subTabs > div > a:nth-child(2)`) === 'CASA') {
                await page.click(`#tournament-table-tabs-and-content > div.subTabs > div > a:nth-child(2)`, {
                    force: true,
                    timeout: 5000
                });

                const htmlClassificaCasa = await page.content();
                // console.log(htmlClassificaCasa);

                const $ = cheerio.load(htmlClassificaCasa);

                $("div.ui-table__row").each(async function(k, element) {
                    // console.log(c)
                    // console.log($(element).text())

                    // console.log($(element).attr('id')/*.slice(4)*/)
                    // console.log($(element).attr('class'))
                    // console.log($(element).parent().text())
                    // console.log($(element).attr('href'))

                    let posizioneCasa = parseInt($(element).find("div.tableCellRank").text().split('.')[0]);
                    let nome = $(element).find("div.table__cell.table__cell--participant").text();
                    let diffRetiCasa = $(element).find("span.table__cell.table__cell--value.table__cell--score").text();
                    let golFattiCasa = parseInt(diffRetiCasa.split(':')[0])
                    let golSubitiCasa = parseInt(diffRetiCasa.split(':')[1])
                    let risultatiCasa = $(element).find("span.table__cell.table__cell--value").text();
                    let puntiCasa = parseInt($(element).find("span.table__cell.table__cell--value.table__cell--points").text());
                    let formaCasa = $(element).find("div.table__cell.table__cell--form").text();
                    // let form = $(element).find("div.tableCellFormIcon").attr('title');
                    // let tbd = $(element).find("div.wld.wld--tbd")/*.text()*/;
                    // let tbd = $(element).find("div.tableCellFormIcon.tableCellFormIcon--TBD").attr('title')/*.text()*/;
                    
                    // let yryruru = await page.locator(`#tournament-table-tabs-and-content > div:nth-child(3) > div:nth-child(1) > div > div > div.ui-table__body > div:nth-child(${k.toString()}) > div.table__cell.table__cell--form`).innerText();
                    // risultatiCasaStringArray.push(yryruru.replace(/\n/g, ''));
                    // let gygbbby = await page.locator(`#tournament-table-tabs-and-content > div:nth-child(3) > div:nth-child(1) > div > div > div.ui-table__body > div:nth-child(${posizioneCasa.toString()}) > div.table__cell.table__cell--form > div.tableCellFormIcon.tableCellFormIcon--TBD`);
                    // let ijmk = await page.locator(``);

                    // for(let ggvijfv = 2; ggvijfv <= 6; ggvijfv++){
                    //     console.log(await gygbbby.nth(ggvijfv).getAttribute('title')/*.replace(/\n/g, '')*/)
                    // }
                    // console.log()

                    let partiteGiocateCasa = await page.locator(`#tournament-table-tabs-and-content > div:nth-child(3) > div:nth-child(1) > div > div > div.ui-table__body > div:nth-child(${(k+1).toString()}) > span:nth-child(3)`).innerText();
                    // console.log('partiteGiocateCasa')
                    // console.log(partiteGiocateCasa)

                    let yryruru = await page.locator(`#tournament-table-tabs-and-content > div:nth-child(3) > div:nth-child(1) > div > div > div.ui-table__body > div:nth-child(${posizioneCasa.toString()}) > div.table__cell.table__cell--form`).innerText();
                    // console.log(yryruru.replace(/\n/g, ''))
                    let formaPuntiCasa = 0;
                    // console.log(risultatiCasa)
                    for(let i = 0; i < yryruru.length; i++){
                        // console.log(form.substring(i, i+1))
                        if(yryruru.substring(i, i+1) === 'V'){
                            formaPuntiCasa += 3;
                        }
                        else if(yryruru.substring(i, i+1) === 'N'){
                            formaPuntiCasa += 1;
                        }
                    }
                    // console.log(formaPuntiCasa)

                    for(let j = 0; j < squadre.length; j++){
                        if(squadre[j].team === nome){
                            squadre[j].posizioneCasa = posizioneCasa;
                            squadre[j].diffRetiCasa = golFattiCasa - golSubitiCasa;
                            squadre[j].golFattiCasa = golFattiCasa;
                            squadre[j].golSubitiCasa = golSubitiCasa;
                            squadre[j].posizioneCasa = posizioneCasa;
                            squadre[j].risultatiCasa = yryruru.replace(/\n/g, '');
                            squadre[j].formaPuntiCasa = formaPuntiCasa;
                            squadre[j].puntiCasa = puntiCasa;
                            squadre[j].partiteGiocateCasa = parseInt(partiteGiocateCasa);
                            // formaCasa: [],
                        }
                    }

                    // console.log('')
                })

                $("div.tableCellFormIcon").each(function(t, element) {
                    // console.log(t)

                    let dataPartita;
                    let nomeSquadraCasa;
                    let nomeSquadraOspite;
                    let golCasa;
                    let golOspite;
                    // let posizioneSquadraCasa;
                    // let posizioneSquadraOspite;
                    let squadraCasa;
                    let squadraOspite;

                    if($(element).text() !== '?') {
                        dataPartita = $(element).attr('title').split('\n')[1].trim();
                        nomeSquadraCasa = $(element).attr('title').split('\n')[0].split('&nbsp;[/b]')[1].slice(1, -1).split(' - ')[0];
                        nomeSquadraOspite = $(element).attr('title').split('\n')[0].split('&nbsp;[/b]')[1].slice(1, -1).split(' - ')[1];
                        golCasa = parseInt($(element).attr('title').split('\n')[0].split('&nbsp;[/b]')[0].slice(3).split(':')[0]);
                        golOspite = parseInt($(element).attr('title').split('\n')[0].split('&nbsp;[/b]')[0].slice(3).split(':')[1])

                        // console.log(nomeSquadraCasa + ' - ' + nomeSquadraOspite)

                        for(let j = 0; j < squadre.length; j++){
                            if(squadre[j].team === nomeSquadraCasa){
                                // posizioneSquadraCasa = element.position;
                                squadraCasa = squadre[j];

                                for(let jj = 0; jj < squadre.length; jj++){
                                    if(squadre[jj].team === nomeSquadraOspite){
                                        // posizioneSquadraCasa = element.position;
                                        squadraOspite = squadre[jj];
                                    }
                                }

                                squadre[j].formaCasa.push({
                                    dataPartita,
                                    nomeSquadraCasa,
                                    nomeSquadraOspite,
                                    squadraCasa,
                                    squadraOspite,
                                    golCasa,
                                    golOspite
                                })
                            }
                        }

                    }

                    // console.log($(element).attr('title'))
                    // console.log('\n')
                })

                await page.click(`#tournament-table-tabs-and-content > div.subTabs > div > a:nth-child(1)`, {
                    // force: true,
                    timeout: 5000
                });
            }

            console.log(await page.innerText(`#tournament-table-tabs-and-content > div.subTabs > div > a:nth-child(3)`));
            if(await page.innerText(`#tournament-table-tabs-and-content > div.subTabs > div > a:nth-child(3)`) === 'FUORI') {
                await page.click(`#tournament-table-tabs-and-content > div.subTabs > div > a:nth-child(3)`, {
                    // force: true,
                    timeout: 5000
                });

                const htmlClassificaFuori = await page.content();
                // console.log(htmlClassificaFuori);

                const $ = cheerio.load(htmlClassificaFuori);

                $("div.ui-table__row").each(async function(k, element) {
                    // console.log(k)
                    // console.log(c)
                    // console.log($(element).text())

                    // console.log($(element).attr('id')/*.slice(4)*/)
                    // console.log($(element).attr('class'))
                    // console.log($(element).parent().text())
                    // console.log($(element).attr('href'))

                    let posizioneFuori = parseInt($(element).find("div.tableCellRank").text().split('.')[0]);
                    let nome = $(element).find("div.table__cell.table__cell--participant").text();
                    let diffRetiFuori = $(element).find("span.table__cell.table__cell--value.table__cell--score").text();
                    let golFattiFuori = parseInt(diffRetiFuori.split(':')[0])
                    let golSubitiFuori = parseInt(diffRetiFuori.split(':')[1])
                    let risultatiCasa = $(element).find("span.table__cell.table__cell--value").text();
                    let puntiFuori = parseInt($(element).find("span.table__cell.table__cell--value.table__cell--points").text());
                    let formaCasa = $(element).find("div.table__cell.table__cell--form").text();
                    // let form = $(element).find("div.tableCellFormIcon").attr('title');
                    // let tbd = $(element).find("div.wld.wld--tbd")/*.text()*/;
                    // let tbd = $(element).find("div.tableCellFormIcon.tableCellFormIcon--TBD").attr('title')/*.text()*/;

                    let partiteGiocateFuori = await page.locator(`#tournament-table-tabs-and-content > div:nth-child(3) > div:nth-child(1) > div > div > div.ui-table__body > div:nth-child(${(k+1).toString()}) > span:nth-child(3)`).innerText();

                    // let yryruru = await page.locator(`#tournament-table-tabs-and-content > div:nth-child(3) > div:nth-child(1) > div > div > div.ui-table__body > div:nth-child(${k.toString()}) > div.table__cell.table__cell--form`).innerText();
                    // risultatiCasaStringArray.push(yryruru.replace(/\n/g, ''));
                    let yryruru = await page.locator(`#tournament-table-tabs-and-content > div:nth-child(3) > div:nth-child(1) > div > div > div.ui-table__body > div:nth-child(${posizioneFuori.toString()}) > div.table__cell.table__cell--form`).innerText();
                    // console.log(yryruru.replace(/\n/g, ''))
                    // console.log()

                    let formaPuntiFuori = 0;
                    // console.log(risultatiCasa)
                    for(let i = 0; i < yryruru.length; i++){
                        // console.log(form.substring(i, i+1))
                        if(yryruru.substring(i, i+1) === 'V'){
                            formaPuntiFuori += 3;
                        }
                        else if(yryruru.substring(i, i+1) === 'N'){
                            formaPuntiFuori += 1;
                        }
                    }
                    // console.log(formaPuntiCasa)


                    for(let jpp = 0; jpp < squadre.length; jpp++){
                        if(squadre[jpp].team === nome){
                            // console.log(squadre[j].team)
                            // console.log(posizioneFuori)
                            // console.log(golFattiFuori)

                            squadre[jpp].posizioneFuori = posizioneFuori;
                            squadre[jpp].diffRetiFuori = golFattiFuori - golSubitiFuori;
                            squadre[jpp].golFattiFuori = golFattiFuori;
                            squadre[jpp].golSubitiFuori = golSubitiFuori;
                            squadre[jpp].posizioneFuori = posizioneFuori;
                            squadre[jpp].risultatiFuori = yryruru.replace(/\n/g, '');
                            squadre[jpp].formaPuntiFuori = formaPuntiFuori;
                            squadre[jpp].puntiFuori = puntiFuori;
                            squadre[jpp].partiteGiocateFuori = parseInt(partiteGiocateFuori);
                            // formaCasa: [],
                        }
                    }

                    // console.log('\n')
                });

                $("div.tableCellFormIcon").each(function(t, element) {
                    // console.log(t)

                    let dataPartita;
                    let nomeSquadraCasa;
                    let nomeSquadraOspite;
                    let golCasa;
                    let golOspite;
                    // let posizioneSquadraCasa;
                    // let posizioneSquadraOspite;
                    let squadraCasa;
                    let squadraOspite;

                    if($(element).text() !== '?') {
                        dataPartita = $(element).attr('title').split('\n')[1].trim();
                        nomeSquadraCasa = $(element).attr('title').split('\n')[0].split('&nbsp;[/b]')[1].slice(1, -1).split(' - ')[0];
                        nomeSquadraOspite = $(element).attr('title').split('\n')[0].split('&nbsp;[/b]')[1].slice(1, -1).split(' - ')[1];
                        golCasa = parseInt($(element).attr('title').split('\n')[0].split('&nbsp;[/b]')[0].slice(3).split(':')[0]);
                        golOspite = parseInt($(element).attr('title').split('\n')[0].split('&nbsp;[/b]')[0].slice(3).split(':')[1])

                        // console.log(nomeSquadraCasa + ' - ' + nomeSquadraOspite)

                        for(let j = 0; j < squadre.length; j++){
                            if(squadre[j].team === nomeSquadraOspite){
                                // posizioneSquadraCasa = element.position;
                                squadraOspite = squadre[j];

                                for(let jj = 0; jj < squadre.length; jj++){
                                    if(squadre[jj].team === nomeSquadraCasa){
                                        // posizioneSquadraCasa = element.position;
                                        squadraCasa = squadre[jj];
                                    }
                                }

                                squadre[j].formaFuori.push({
                                    dataPartita,
                                    nomeSquadraCasa,
                                    nomeSquadraOspite,
                                    squadraCasa,
                                    squadraOspite,
                                    golCasa,
                                    golOspite
                                })
                            }
                            // else if(squadre[j].team === nomeSquadraOspite){
                            //     // posizioneSquadraCasa = element.position;
                            //     squadraOspite = squadre[j];
                            //     squadre[j].formaCasa.push({
                            //         squadraOspite,
                            //     })
                            // }
                        }
                    }

                    // console.log($(element).attr('title'))
                    // console.log('\n')
                })

                await page.click(`#tournament-table-tabs-and-content > div.subTabs > div > a:nth-child(1)`, {
                    force: true,
                    timeout: 5000
                });
            }


            // squadre.forEach(function(element) {
            //     // console.log(element.team)
            //     // console.log(element.form)
            //     // console.log(element.forma.length)
            //     // console.log(element.forma)
            //     let condizione = 0;
            //     for(let i = 0; i < element.form.length; i++){
            //         // console.log(form.substring(i, i+1))
            //         if(element.form.substring(i, i+1) === 'V'){
            //             if(i === 4){
            //                 condizione += 2.5;
            //             }
            //             else if(i === 5){
            //                 condizione += 2;
            //             }
            //             else{
            //                 condizione += 3;
            //             }
            //         }
            //         else if(element.form.substring(i, i+1) === 'N'){
            //             condizione += 1;
            //         }
            //     }
            //     element.condizione = condizione;
            // });

            const coefficienteSconfittaCasa = 1;
            const coefficienteSconfittaFuori = 3;
            const coefficientePareggioCasa = /*1*/5;
            const coefficientePareggioFuori = /*1.8*/9;
            const coefficienteVittoriaCasa = /*2.2*/11;
            const coefficienteVittoriaFuori = /*3*/15;
            const coefficienteGiornata = 1;
            const coefficienteQuartUltimaGiornata = 0.9;
            const coefficienteQuintUltimaGiornata = 0.85;
            const coefficienteQuartUltimaGiornata1 = 0.9;
            const coefficienteQuintUltimaGiornata1 = 0.85;
            squadre.forEach(function(element) {
                // console.log('element.team')
                // console.log(element.team)

                // console.log('element.forma[0].squadraCasa.team')
                // console.log(element.forma[0].squadraCasa.team)
                // console.log('squadre[j].team')
                // console.log(squadre[j].team)
                // console.log(element.form)
                // console.log(element.forma.length)
                // console.log(element.forma)
                let condizione = 0;
                // element.forma.forEach(function(formaElement) {
                // })
                for(let i = 0; i < element.forma.length; i++){
                    // console.log(element.forma[i].squadraCasa.position);
                    // console.log(element.forma[i].squadraCasa.team);

                    if(element.form.substring(i+1, i+2) === 'V'){
                        if(i+1 === 5){
                            if(element.forma[i].squadraCasa.team === element.team){
                                condizione += (coefficienteQuintUltimaGiornata * coefficienteVittoriaCasa * ((squadre.length + 1 - element.forma[i].squadraOspite.position) * 1));
                            }
                            else if(element.forma[i].squadraOspite.team === element.team){
                                condizione += (coefficienteQuintUltimaGiornata * coefficienteVittoriaFuori * ((squadre.length + 1 - element.forma[i].squadraCasa.position) * 1));
                            }
                        }
                        else if(i+1 === 4){
                            if(element.forma[i].squadraCasa.team === element.team){
                                condizione += (coefficienteQuartUltimaGiornata * coefficienteVittoriaCasa * ((squadre.length + 1 - element.forma[i].squadraOspite.position) * 1));
                            }
                            else if(element.forma[i].squadraOspite.team === element.team){
                                condizione += (coefficienteQuartUltimaGiornata * coefficienteVittoriaFuori * ((squadre.length + 1 - element.forma[i].squadraCasa.position) * 1));
                            }
                        }
                        else{
                            if(element.forma[i].squadraCasa.team === element.team){
                                condizione += (coefficienteGiornata * coefficienteVittoriaCasa * ((squadre.length + 1 - element.forma[i].squadraOspite.position) * 1));
                            }
                            else if(element.forma[i].squadraOspite.team === element.team){
                                condizione += (coefficienteGiornata * coefficienteVittoriaFuori * ((squadre.length + 1 - element.forma[i].squadraCasa.position) * 1));
                            }
                        }
                    }
                    else if(element.form.substring(i+1, i+2) === 'N'){
                        if(i+1 === 5){
                            if(element.forma[i].squadraCasa.team === element.team){
                                condizione += (coefficienteQuintUltimaGiornata * coefficientePareggioCasa * ((squadre.length + 1 - element.forma[i].squadraOspite.position) * 1));
                            }
                            else if(element.forma[i].squadraOspite.team === element.team){
                                condizione += (coefficienteQuintUltimaGiornata * coefficientePareggioFuori * ((squadre.length + 1 - element.forma[i].squadraCasa.position) * 1));
                            }
                        }
                        else if(i+1 === 4){
                            if(element.forma[i].squadraCasa.team === element.team){
                                condizione += (coefficienteQuartUltimaGiornata * coefficientePareggioCasa * ((squadre.length + 1 - element.forma[i].squadraOspite.position) * 1));
                            }
                            else if(element.forma[i].squadraOspite.team === element.team){
                                condizione += (coefficienteQuartUltimaGiornata * coefficientePareggioFuori * ((squadre.length + 1 - element.forma[i].squadraCasa.position) * 1));
                            }
                        }
                        else {
                            if(element.forma[i].squadraCasa.team === element.team){
                                condizione += (coefficienteGiornata * coefficientePareggioCasa * ((squadre.length + 1 - element.forma[i].squadraOspite.position) * 1));
                            }
                            else if(element.forma[i].squadraOspite.team === element.team){
                                condizione += (coefficienteGiornata * coefficientePareggioFuori * ((squadre.length + 1 - element.forma[i].squadraCasa.position) * 1));
                            }
                        }
                    }
                    else if(element.form.substring(i+1, i+2) === 'P'){
                        if(i+1 === 5){
                            if(element.forma[i].squadraCasa.team === element.team){
                                condizione += (coefficienteQuintUltimaGiornata * coefficienteSconfittaCasa * ((squadre.length + 1 - element.forma[i].squadraOspite.position) * 1));
                            }
                            else if(element.forma[i].squadraOspite.team === element.team){
                                condizione += (coefficienteQuintUltimaGiornata * coefficienteSconfittaFuori * ((squadre.length + 1 - element.forma[i].squadraCasa.position) * 1));
                            }
                        }
                        else if(i+1 === 4){
                            if(element.forma[i].squadraCasa.team === element.team){
                                condizione += (coefficienteQuartUltimaGiornata * coefficienteSconfittaCasa * ((squadre.length + 1 - element.forma[i].squadraOspite.position) * 1));
                            }
                            else if(element.forma[i].squadraOspite.team === element.team){
                                condizione += (coefficienteQuartUltimaGiornata * coefficienteSconfittaFuori * ((squadre.length + 1 - element.forma[i].squadraCasa.position) * 1));
                            }
                        }
                        else {
                            if(element.forma[i].squadraCasa.team === element.team){
                                condizione += (coefficienteGiornata * coefficienteSconfittaCasa * ((squadre.length + 1 - element.forma[i].squadraOspite.position) * 1));
                            }
                            else if(element.forma[i].squadraOspite.team === element.team){
                                condizione += (coefficienteGiornata * coefficienteSconfittaFuori * ((squadre.length + 1 - element.forma[i].squadraCasa.position) * 1));
                            }
                        }
                    }
                }

                let condizioneFormula = condizione/squadre.length;
                element.condizione = Math.round(condizioneFormula * 100)/100;
                element.forza = Math.round((((squadre.length + 1 - element.position) + condizioneFormula)/2) * 100)/100;
                // console.log(element.condizione)
                // console.log(element.forza)

                // console.log('\n')
            })
            squadre.forEach(function(element) {
                // console.log('element.team')
                // console.log(element.team)

                // console.log('element.forma[0].squadraCasa.team')
                // console.log(element.forma[0].squadraCasa.team)
                // console.log('squadre[j].team')
                // console.log(squadre[j].team)
                // console.log(element.form)
                // console.log(element.forma.length)
                // console.log(element.forma)
                let condizioneCasa = 0;
                // element.forma.forEach(function(formaElement) {
                // })
                for(let i = 0; i < element.formaCasa.length; i++){
                    // console.log(element.forma[i].squadraCasa.position);
                    // console.log(element.forma[i].squadraCasa.team);

                    if(element.risultatiCasa.substring(i+1, i+2) === 'V'){
                        if(i+1 === 5){
                            if(element.formaCasa[i].squadraCasa.team === element.team){
                                condizioneCasa += (coefficienteQuintUltimaGiornata1 * coefficienteVittoriaCasa * ((squadre.length + 1 - element.formaCasa[i].squadraOspite.position) * 1));
                            }
                            // else if(element.formaCasa[i].squadraOspite.team === element.team){
                            //     condizione += (coefficienteQuintUltimaGiornata * coefficienteVittoriaFuori * ((squadre.length + 1 - element.forma[i].squadraCasa.position) * 1));
                            // }
                        }
                        else if(i+1 === 4){
                            if(element.formaCasa[i].squadraCasa.team === element.team){
                                condizioneCasa += (coefficienteQuartUltimaGiornata1 * coefficienteVittoriaCasa * ((squadre.length + 1 - element.formaCasa[i].squadraOspite.position) * 1));
                            }
                            // else if(element.formaCasa[i].squadraOspite.team === element.team){
                            //     condizione += (coefficienteQuartUltimaGiornata * coefficienteVittoriaFuori * ((squadre.length + 1 - element.forma[i].squadraCasa.position) * 1));
                            // }
                        }
                        else{
                            if(element.formaCasa[i].squadraCasa.team === element.team){
                                condizioneCasa += (coefficienteGiornata * coefficienteVittoriaCasa * ((squadre.length + 1 - element.formaCasa[i].squadraOspite.position) * 1));
                            }
                            // else if(element.formaCasa[i].squadraOspite.team === element.team){
                            //     condizione += (coefficienteGiornata * coefficienteVittoriaFuori * ((squadre.length + 1 - element.forma[i].squadraCasa.position) * 1));
                            // }
                        }
                    }
                    else if(element.risultatiCasa.substring(i+1, i+2) === 'N'){
                        if(i+1 === 5){
                            if(element.formaCasa[i].squadraCasa.team === element.team){
                                condizioneCasa += (coefficienteQuintUltimaGiornata1 * coefficientePareggioCasa * ((squadre.length + 1 - element.formaCasa[i].squadraOspite.position) * 1));
                            }
                            // else if(element.formaCasa[i].squadraOspite.team === element.team){
                            //     condizione += (coefficienteQuintUltimaGiornata * coefficientePareggioFuori * ((squadre.length + 1 - element.forma[i].squadraCasa.position) * 1));
                            // }
                        }
                        else if(i+1 === 4){
                            if(element.formaCasa[i].squadraCasa.team === element.team){
                                condizioneCasa += (coefficienteQuartUltimaGiornata1 * coefficientePareggioCasa * ((squadre.length + 1 - element.formaCasa[i].squadraOspite.position) * 1));
                            }
                            // else if(element.formaCasa[i].squadraOspite.team === element.team){
                            //     condizione += (coefficienteQuartUltimaGiornata * coefficientePareggioFuori * ((squadre.length + 1 - element.forma[i].squadraCasa.position) * 1));
                            // }
                        }
                        else {
                            if(element.formaCasa[i].squadraCasa.team === element.team){
                                condizioneCasa += (coefficienteGiornata * coefficientePareggioCasa * ((squadre.length + 1 - element.formaCasa[i].squadraOspite.position) * 1));
                            }
                            // else if(element.formaCasa[i].squadraOspite.team === element.team){
                            //     condizione += (coefficienteGiornata * coefficientePareggioFuori * ((squadre.length + 1 - element.forma[i].squadraCasa.position) * 1));
                            // }
                        }
                    }
                    else if(element.risultatiCasa.substring(i+1, i+2) === 'P'){
                        if(i+1 === 5){
                            if(element.formaCasa[i].squadraCasa.team === element.team){
                                condizioneCasa += (coefficienteQuintUltimaGiornata1 * coefficienteSconfittaCasa * ((squadre.length + 1 - element.formaCasa[i].squadraOspite.position) * 1));
                            }
                            // else if(element.formaCasa[i].squadraOspite.team === element.team){
                            //     condizione += (coefficienteQuintUltimaGiornata * coefficienteSconfittaFuori * ((squadre.length + 1 - element.forma[i].squadraCasa.position) * 1));
                            // }
                        }
                        else if(i+1 === 4){
                            if(element.formaCasa[i].squadraCasa.team === element.team){
                                condizioneCasa += (coefficienteQuartUltimaGiornata1 * coefficienteSconfittaCasa * ((squadre.length + 1 - element.formaCasa[i].squadraOspite.position) * 1));
                            }
                            // else if(element.formaCasa[i].squadraOspite.team === element.team){
                            //     condizione += (coefficienteQuartUltimaGiornata * coefficienteSconfittaFuori * ((squadre.length + 1 - element.forma[i].squadraCasa.position) * 1));
                            // }
                        }
                        else {
                            if(element.formaCasa[i].squadraCasa.team === element.team){
                                condizioneCasa += (coefficienteGiornata * coefficienteSconfittaCasa * ((squadre.length + 1 - element.formaCasa[i].squadraOspite.position) * 1));
                            }
                            // else if(element.forma[i].squadraOspite.team === element.team){
                            //     condizione += (coefficienteGiornata * coefficienteSconfittaFuori * ((squadre.length + 1 - element.forma[i].squadraCasa.position) * 1));
                            // }
                        }
                    }
                }

                let condizioneFormula = condizioneCasa/squadre.length;
                element.condizioneCasa = Math.round(condizioneFormula * 100)/100;
                element.forzaCasa = Math.round((((squadre.length + 1 - element./*position*/posizioneCasa) + condizioneFormula)/2) * 100)/100;
                // console.log(element.condizione)
                // console.log(element.forza)

                // console.log('\n')
            })
            squadre.forEach(function(element) {
                // console.log('element.team')
                // console.log(element.team)

                // console.log('element.forma[0].squadraCasa.team')
                // console.log(element.forma[0].squadraCasa.team)
                // console.log('squadre[j].team')
                // console.log(squadre[j].team)
                // console.log(element.form)
                // console.log(element.forma.length)
                // console.log(element.forma)
                let condizioneFuori = 0;
                // element.forma.forEach(function(formaElement) {
                // })
                for(let i = 0; i < element.formaFuori.length; i++){
                    // console.log(element.forma[i].squadraCasa.position);
                    // console.log(element.forma[i].squadraCasa.team);

                    if(element.risultatiFuori.substring(i+1, i+2) === 'V'){
                        if(i+1 === 5){
                            if(element.formaFuori[i].squadraOspite.team === element.team){
                                condizioneFuori += (coefficienteQuintUltimaGiornata1 * coefficienteVittoriaFuori * ((squadre.length + 1 - element.formaFuori[i].squadraCasa.position) * 1));
                            }
                        }
                        else if(i+1 === 4){
                            if(element.formaFuori[i].squadraOspite.team === element.team){
                                condizioneFuori += (coefficienteQuartUltimaGiornata1 * coefficienteVittoriaFuori * ((squadre.length + 1 - element.formaFuori[i].squadraCasa.position) * 1));
                            }
                        }
                        else{
                            if(element.formaFuori[i].squadraOspite.team === element.team){
                                condizioneFuori += (coefficienteGiornata * coefficienteVittoriaFuori * ((squadre.length + 1 - element.formaFuori[i].squadraCasa.position) * 1));
                            }
                        }
                    }
                    else if(element.risultatiFuori.substring(i+1, i+2) === 'N'){
                        if(i+1 === 5){
                            if(element.formaFuori[i].squadraOspite.team === element.team){
                                condizioneFuori += (coefficienteQuintUltimaGiornata1 * coefficientePareggioFuori * ((squadre.length + 1 - element.formaFuori[i].squadraCasa.position) * 1));
                            }
                        }
                        else if(i+1 === 4){
                            if(element.formaFuori[i].squadraOspite.team === element.team){
                                condizioneFuori += (coefficienteQuartUltimaGiornata1 * coefficientePareggioFuori * ((squadre.length + 1 - element.formaFuori[i].squadraCasa.position) * 1));
                            }
                        }
                        else {
                            if(element.formaFuori[i].squadraOspite.team === element.team){
                                condizioneFuori += (coefficienteGiornata * coefficientePareggioFuori * ((squadre.length + 1 - element.formaFuori[i].squadraCasa.position) * 1));
                            }
                        }
                    }
                    else if(element.risultatiFuori.substring(i+1, i+2) === 'P'){
                        if(i+1 === 5){
                            if(element.formaFuori[i].squadraOspite.team === element.team){
                                condizioneFuori += (coefficienteQuintUltimaGiornata1 * coefficienteSconfittaFuori * ((squadre.length + 1 - element.formaFuori[i].squadraCasa.position) * 1));
                            }
                        }
                        else if(i+1 === 4){
                            if(element.formaFuori[i].squadraOspite.team === element.team){
                                condizioneFuori += (coefficienteQuartUltimaGiornata1 * coefficienteSconfittaFuori * ((squadre.length + 1 - element.formaFuori[i].squadraCasa.position) * 1));
                            }
                        }
                        else {
                            if(element.formaFuori[i].squadraOspite.team === element.team){
                                condizioneFuori += (coefficienteGiornata * coefficienteSconfittaFuori * ((squadre.length + 1 - element.formaFuori[i].squadraCasa.position) * 1));
                            }
                        }
                    }
                }

                let condizioneFormula = condizioneFuori/squadre.length;
                element.condizioneFuori = Math.round(condizioneFormula * 100)/100;
                element.forzaFuori = Math.round((((squadre.length + 1 - element./*position*/posizioneFuori) + condizioneFormula)/2) * 100)/100;
                // console.log(element.condizione)
                // console.log(element.forza)

                // console.log('\n')
            })

            console.log('squadre: ' + squadre.length);
            console.log(squadre);
            // squadre.forEach(function(element) {
            //     console.log(element.team)
            //     console.log(element.formaCasa)
            //     console.log(element.formaFuori)
            // })

            pObj.addText('squadre: ' + squadre.length + '\n', {
                color: '000000',
                // bold: true,
                font_size: 16
            });
            pObj.addLineBreak();

            // console.log('\n')
            console.log('')

            // console.log(partiteGiocate.length)
            // for(let i = 0; i < partiteGiocate.length; i++){
            //     for(let j = 0; j < partiteGiocate.length; j++){
            //         if(partiteGiocate[j].squadraCasa === partiteGiocate[i].squadraCasa &&
            //             partiteGiocate[j].squadraOspite === partiteGiocate[i].squadraOspite &&
            //             partiteGiocate[j].dataPartita === partiteGiocate[i].dataPartita){
            //             partiteGiocate.splice(i, 1);
            //         }
            //     }
            // }
            // console.log(partiteGiocate.length)
            // console.log(partiteGiocate)
            // console.log('\n')
            // console.log(prossimePartite.length)
            // for(let i = 0; i < prossimePartite.length; i++){
            //     for(let j = 0; j < prossimePartite.length; j++){
            //         if(prossimePartite[j].squadraCasa === prossimePartite[i].squadraCasa &&
            //             prossimePartite[j].squadraOspite === prossimePartite[i].squadraOspite &&
            //             prossimePartite[j].dataPartita === prossimePartite[i].dataPartita){
            //             prossimePartite.splice(j, 1);
            //         }
            //     }
            // }
            // console.log(prossimePartite.length)
            // console.log(prossimePartite)


            let giornataEvento = [];
            // let giornataEvento = new Set();
            for(let i = 0; i < squadre.length; i++){
                // console.log(squadre[i].prossimo)
                // console.log(squadre[i].prossimo.squadraCasa)
                let dataPartita;
                let casa;
                let ospite;

                for(let j = 0; j < squadre.length; j++){
                    try {
                        dataPartita = squadre[i].prossimo.dataPartita;
                        // console.log(squadre[j])
                        if(squadre[j].team === squadre[i].prossimo.squadraCasa.team){
                            // console.log('casa')
                            // console.log(squadre[j])
                            casa = squadre[j];
                        }
                        else if(squadre[j].team === squadre[i].prossimo.squadraOspite.team){
                            // console.log('ospite')
                            // console.log(squadre[j])
                            ospite = squadre[j];
                        }
                    } catch (e) {
                        // console.log(e)
                    }
                }

                giornataEvento.push({
                // giornataEvento.add({
                    dataPartita,
                    quote: [],
                    casa,
                    ospite,
                    mediaQuota1: null,
                    mediaQuotaX: null,
                    mediaQuota2: null,
                });

                // console.log('\n')
            }

            // let giornataEvento1 = [];
            // giornataEvento.forEach(function(element) {
            //     console.log(element)
            //     giornataEvento.forEach(function(element1) {
            //         // if (element.casa === element1.casa && element.ospite === element1.ospite) {
            //         if (giornataEvento1.) {
            //             giornataEvento1.push(element);
            //         }
            //     })
            // });
            // console.log(giornataEvento1.length)

            // console.log(giornataEvento)
            // console.log(giornataEvento.length)

            const arrayOfLocators = await page.locator('div.wld.wld--tbd');
            const elementsCount = await arrayOfLocators.count();
            console.log(elementsCount)
            let texts = [];
            for(let index = 1; index <= elementsCount; index++) {
                const element = await arrayOfLocators.nth(index);
                // const innerText = await element.innerText();
                // const attrId = await element.getAttribute('id');
                // texts.push(innerText);
                // console.log(innerText)
                // console.log(attrId)
                let hhggbb = `#tournament-table-tabs-and-content > div:nth-child(3) > div:nth-child(1) > div > div > div.ui-table__body > div:nth-child(${index.toString()}) > div.table__cell.table__cell--form > div.tableCellFormIcon.tableCellFormIcon--TBD > div`;

                try {
                    const [newPage1] = await Promise.all([
                        context.waitForEvent('page'),
                        // This action triggers the new tab
                        // pageRim.locator('text=By iVagus Services Pvt. Ltd.').click(),
                        // page.click('a[target="_blank"]') // Opens a new tab
                        page.waitForSelector(hhggbb),
                        page.click(hhggbb, {
                            // force: true,
                            // timeout: 1500
                        })
                    ]);
                    await newPage1.waitForLoadState("domcontentloaded", {
                        timeout: 1500
                    });
                    // let htmlQuote1x2 = await newPage1.content(); //per prendere gli eventi della prima tab

                    console.log(await newPage1.url());
                    // console.log(await newPage1.innerText(`#detail > div.tabs.tabs__detail > div > a:nth-child(2)`));
                    if(await newPage1.innerText(`#detail > div.tabs.tabs__detail > div > a:nth-child(2)`) === 'COMP. QUOTE'){
                        await newPage1.click(`#detail > div.tabs.tabs__detail > div > a:nth-child(2)`, {
                            force: true,
                            timeout: 5000
                        });

                        const htmlQuote1x2 = await newPage1.content();
                        // console.log(htmlQuote1x2);

                        const $ = cheerio.load(htmlQuote1x2);

                        // console.log($("div.ui-table__row").first().text());

                        $("div.ui-table__row").each(async function(j, element) {
                            try {
                                // console.log(j)
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
                                console.log('(1): ' + quota1.toFixed(2) + ', ' + '(X): ' + quotaX.toFixed(2) + ', ' + '(2): ' + quota2.toFixed(2))
                                // console.log('quota 1: ' + quota1)
                                // console.log('quota X: ' + quotaX)
                                // console.log('quota 2: ' + quota2)

                                // console.log('')

                                giornataEvento[index-1].quote.push({
                                    // prossimePartite[index].quote.push({
                                    bookmaker,
                                    quota1,
                                    quotaX,
                                    quota2
                                });

                            } catch (e) {
                                // console.log(e)
                            }

                            // console.log('')
                        })

                        // todo: fare media quote e metterla in giornataEvento[index-1]
                        let quota1Total = 0;
                        let quotaXTotal = 0;
                        let quota2Total = 0;
                        let j;
                        for(j = 0; j < giornataEvento[index-1].quote.length; j++){
                            quota1Total += giornataEvento[index-1].quote[j].quota1
                            quotaXTotal += giornataEvento[index-1].quote[j].quotaX
                            quota2Total += giornataEvento[index-1].quote[j].quota2
                        }
                        // for (let elem in giornataEvento[index-1].quote) {
                        //     quotaTotal += giornataEvento[index-1].quote[elem].quotaX;
                        // }

                        giornataEvento[index-1].mediaQuota1 = parseFloat((quota1Total/j).toFixed(2));
                        giornataEvento[index-1].mediaQuotaX = parseFloat((quotaXTotal/j).toFixed(2));
                        giornataEvento[index-1].mediaQuota2 = parseFloat((quota2Total/j).toFixed(2));
                        console.log('mediaQuota1: ' + (quota1Total/j).toFixed(2))
                        console.log('mediaQuotaX: ' + (quotaXTotal/j).toFixed(2))
                        console.log('mediaQuota2: ' + (quota2Total/j).toFixed(2))


                        // const fvujvfuj = await newPage1.locator('div.ui-table__row');
                        // const elementsCount0 = await fvujvfuj.count();
                        // console.log(elementsCount0)
                        // for(let j = 1; j <= elementsCount0; j++) {
                        //     let suleiman = `#detail > div.oddsPlacement.oddsPlacement--bottom > div > div.oddsWrapper > div > div:nth-child(${j.toString()})`;
                        //     console.log(await newPage1.innerText(suleiman));
                        // }
                    }

                    // fs.writeFileSync(`./html/quote1x2/${(await newPage1.url()).slice(8).replace(/\//g, "____")}.html`, htmlQuote1x2)

                    await newPage1.close();
                    // console.log(texts)
                    console.log()
                } catch (e) {
                    
                }

            }

            // console.log(prossimePartite)
            // console.log(giornataEvento)

            let ospitePiuAltoInClassifica = [];
            try {
                giornataEvento.forEach(function(element) {
                    // console.log(element.casa)
                    // let posizioneDiff = element.casa.position - element.ospite.position;
                    // let condizioneDiff = element.casa.condizione - element.ospite.condizione;
                    // let forzaDiff = element.casa.forza - element.ospite.forza;
                    // console.log(posizioneDiff)

                    let partiteSquadraCasaInCasa = 0;
                    let vittorieSquadraCasaInCasa = 0;
                    let pareggiSquadraCasaInCasa = 0;
                    let sconfitteSquadraCasaInCasa = 0;

                    let partiteSquadraCasaInOspite = 0;
                    let vittorieSquadraCasaInOspite = 0;
                    let pareggiSquadraCasaInOspite = 0;
                    let sconfitteSquadraCasaInOspite = 0;

                    let golFattiSquadraCasaInCasa = 0;
                    let golFattiSquadraCasaInOspite = 0;
                    let golSubitiSquadraCasaInCasa = 0;
                    let golSubitiSquadraCasaInOspite = 0;

                    let partiteSquadraOspiteInCasa = 0;
                    let vittorieSquadraOspiteInCasa = 0;
                    let pareggiSquadraOspiteInCasa = 0;
                    let sconfitteSquadraOspiteInCasa = 0;

                    let partiteSquadraOspiteInOspite = 0;
                    let vittorieSquadraOspiteInOspite = 0;
                    let pareggiSquadraOspiteInOspite = 0;
                    let sconfitteSquadraOspiteInOspite = 0;

                    let golFattiSquadraOspiteInCasa = 0;
                    let golFattiSquadraOspiteInOspite = 0;
                    let golSubitiSquadraOspiteInCasa = 0;
                    let golSubitiSquadraOspiteInOspite = 0;

                    //todo: fare la stessa cosa per le ultime 5 partite in casa e fuori
                    element.casa.forma.forEach(function(casaElement) {
                        // console.log(element);
                        // console.log(element.casa.team);
                        // console.log('casaPosizione: ' + element.casa.position);
                        // console.log(casaElement.squadraCasa);
                        // console.log(casaElement.squadraOspite);
                        // console.log('\n')
                        if(casaElement.squadraCasa.team.trim() === element.casa.team.trim()){
                            partiteSquadraCasaInCasa++;
                            golFattiSquadraCasaInCasa += casaElement.golCasa
                            golSubitiSquadraCasaInCasa += casaElement.golOspite;

                            if(golFattiSquadraCasaInCasa > golSubitiSquadraCasaInCasa){
                                vittorieSquadraCasaInCasa++;
                            }
                            else if(golFattiSquadraCasaInCasa < golSubitiSquadraCasaInCasa){
                                sconfitteSquadraCasaInCasa++;
                            }
                            else {
                                pareggiSquadraCasaInCasa++;
                            }
                        }
                        else if(casaElement.squadraOspite.team.trim() === element.casa.team.trim()){
                            partiteSquadraCasaInOspite++;
                            golFattiSquadraCasaInOspite += casaElement.golOspite;
                            golSubitiSquadraCasaInOspite += casaElement.golCasa;

                            if(golFattiSquadraCasaInOspite > golSubitiSquadraCasaInOspite){
                                vittorieSquadraCasaInOspite++;
                            }
                            else if(golFattiSquadraCasaInOspite < golSubitiSquadraCasaInOspite){
                                sconfitteSquadraCasaInOspite++;
                            }
                            else {
                                pareggiSquadraCasaInOspite++;
                            }
                        }
                    })
                    element.ospite.forma.forEach(function(ospiteElement) {
                            // console.log(element);
                            // console.log(element.ospite.team);
                            // console.log(casaElement.squadraCasa);
                            // console.log(casaElement.squadraOspite);
                            // console.log('\n')
                            if(ospiteElement.squadraCasa.team.trim() === element.ospite.team.trim()){
                                partiteSquadraOspiteInCasa++;
                                golFattiSquadraOspiteInCasa += ospiteElement.golCasa;
                                golSubitiSquadraOspiteInCasa += ospiteElement.golOspite;

                                if(golFattiSquadraOspiteInCasa > golSubitiSquadraOspiteInCasa){
                                    vittorieSquadraOspiteInCasa++;
                                }
                                else if(golFattiSquadraOspiteInCasa < golSubitiSquadraOspiteInCasa){
                                    sconfitteSquadraOspiteInCasa++;
                                }
                                else {
                                    pareggiSquadraOspiteInCasa++;
                                }
                            }
                            else if(ospiteElement.squadraOspite.team.trim() === element.ospite.team.trim()){
                                partiteSquadraOspiteInOspite++;
                                golFattiSquadraOspiteInOspite += ospiteElement.golOspite
                                golSubitiSquadraOspiteInOspite += ospiteElement.golCasa;

                                if(golFattiSquadraOspiteInOspite > golSubitiSquadraOspiteInOspite){
                                    vittorieSquadraOspiteInOspite++;
                                }
                                else if(golFattiSquadraOspiteInOspite < golSubitiSquadraOspiteInOspite){
                                    sconfitteSquadraOspiteInOspite++;
                                }
                                else {
                                    pareggiSquadraOspiteInOspite++;
                                }
                            }
                        })

                    if(element.quote.length > 0){
                        if(
                            // posizioneDiff > 0 && posizioneDiff < (squadre.length * 1.8 / 4) &&
                            // element.casa.position <= (squadre.length * 2.5 / 4) &&
                            // /* (element.casa.golSubiti / element.casa.partiteGiocate) <= 1.2 && */
                            // ((element.casa.position + element.ospite.position)/2) < squadre.length &&
                            // (element.casa.diffReti > 0 && element.ospite.diffReti > 0) &&
                            /* forzaDiff < 0 && */
                            // element.mediaQuotaX < 3.0
                            /* per gli esiti (1) o (2) */
                            ((element.ospite.forza / element.casa.forza) > 1.66 && element.mediaQuota2 >= 2.1 && element.mediaQuota1 > element.mediaQuota2) ||
                            ((element.ospite.forza / element.casa.forza) < 0.6 && element.mediaQuota1 >= 2.1 && element.mediaQuota2 > element.mediaQuota1)
                            // 1
                        ){
                            ospitePiuAltoInClassifica.push(element)

                            // console.log(element)
                            console.log(element.dataPartita);
                            pObj.addText(element.dataPartita, {
                                color: '000000',
                                // bold: true,
                                font_size: 16
                            });
                            pObj.addLineBreak();
                            // console.log(element.casa.team + ' - ' + element.ospite.team)
                            console.log(element.casa.team + '(' + element.casa.position + ')' + '(' + element.casa.punti + ')' + '(' + element.casa.posizioneCasa + ')' + '(' + element.casa.puntiCasa + ')' + '(' + element.casa.forza + ')' /*+ '(' + element.casa.forzaCasa + ')'*/ + ' - ' + element.ospite.team + '(' + element.ospite.position + ')' + '(' + element.ospite.punti + ')' + '(' + element.ospite.posizioneFuori + ')' + '(' + element.ospite.puntiFuori + ')' + '(' + element.ospite.forza + ')'/* + '(' + element.ospite.forzaFuori + ')'*/);
                            pObj.addText(element.casa.team + '(' + element.casa.position + ')' + '(' + element.casa.punti + ')' + '(' + element.casa.forza + ')' + ' - ' + element.ospite.team + '(' + element.ospite.position + ')' + '(' + element.ospite.punti + ')' + '(' + element.ospite.forza + ')', {
                                color: '000000',
                                bold: true,
                                font_size: 16
                            });
                            pObj.addLineBreak();

                            // console.log('casa.posizioneCasa: ' + element.casa.posizioneCasa);
                            // console.log('casa.puntiCasa: ' + element.casa.puntiCasa);
                            // console.log('ospite.posizioneFuori: ' + element.ospite.posizioneFuori);
                            // console.log('ospite.puntiFuori: ' + element.ospite.puntiFuori);

                            // console.log('partiteSquadraCasaInCasa: ' + partiteSquadraCasaInCasa);
                            // console.log('vittorieSquadraCasaInCasa: ' + vittorieSquadraCasaInCasa);
                            // console.log('pareggiSquadraCasaInCasa: ' + pareggiSquadraCasaInCasa);
                            // console.log('sconfitteSquadraCasaInCasa: ' + sconfitteSquadraCasaInCasa);
                            //
                            // console.log('golFattiSquadraCasaInCasa: ' + golFattiSquadraCasaInCasa);
                            // console.log('golSubitiSquadraCasaInCasa: ' + golSubitiSquadraCasaInCasa);
                            console.log('diffGolSquadraCasaInCasa: ' + (golFattiSquadraCasaInCasa - golSubitiSquadraCasaInCasa));
                            // console.log('rapportoDiffGolSquadraCasaInCasa: ' + partiteSquadraCasaInCasa/(golFattiSquadraCasaInCasa - golSubitiSquadraCasaInCasa));

                            // console.log('partiteSquadraCasaInOspite: ' + partiteSquadraCasaInOspite);
                            // console.log('vittorieSquadraCasaInOspite: ' + vittorieSquadraCasaInOspite);
                            // console.log('pareggiSquadraCasaInOspite: ' + pareggiSquadraCasaInOspite);
                            // console.log('sconfitteSquadraCasaInOspite: ' + sconfitteSquadraCasaInOspite);
                            //
                            // console.log('golFattiSquadraCasaInOspite: ' + golFattiSquadraCasaInOspite);
                            // console.log('golSubitiSquadraCasaInOspite: ' + golSubitiSquadraCasaInOspite);
                            // console.log('diffGolSquadraCasaInOspite: ' + (golFattiSquadraCasaInOspite - golSubitiSquadraCasaInOspite));

                            // console.log('')

                            // console.log('partiteSquadraOspiteInCasa: ' + partiteSquadraOspiteInCasa);
                            // console.log('vittorieSquadraOspiteInCasa: ' + vittorieSquadraOspiteInCasa);
                            // console.log('pareggiSquadraOspiteInCasa: ' + pareggiSquadraOspiteInCasa);
                            // console.log('sconfitteSquadraOspiteInCasa: ' + sconfitteSquadraOspiteInCasa);
                            //
                            // console.log('golFattiSquadraOspiteInCasa: ' + golFattiSquadraOspiteInCasa);
                            // console.log('golSubitiSquadraOspiteInCasa: ' + golSubitiSquadraOspiteInCasa);
                            // console.log('diffGolSquadraOspiteInCasa: ' + (golFattiSquadraOspiteInCasa - golSubitiSquadraOspiteInCasa));

                            // console.log('partiteSquadraOspiteInOspite: ' + partiteSquadraOspiteInOspite);
                            // console.log('vittorieSquadraOspiteInOspite: ' + vittorieSquadraOspiteInOspite);
                            // console.log('pareggiSquadraOspiteInOspite: ' + pareggiSquadraOspiteInOspite);
                            // console.log('sconfitteSquadraOspiteInOspite: ' + sconfitteSquadraOspiteInOspite);
                            //
                            // console.log('golFattiSquadraOspiteInOspite: ' + golFattiSquadraOspiteInOspite);
                            // console.log('golSubitiSquadraOspiteInOspite: ' + golSubitiSquadraOspiteInOspite);
                            console.log('diffGolSquadraOspiteInOspite: ' + (golFattiSquadraOspiteInOspite - golSubitiSquadraOspiteInOspite));
                            // console.log('rapportoDiffGolSquadraOspiteInOspite: ' + partiteSquadraOspiteInOspite/(golFattiSquadraOspiteInOspite - golSubitiSquadraOspiteInOspite));

                            // console.log('casa.partiteGiocate: ' + element.casa.partiteGiocate);
                            // console.log('ospite.partiteGiocate: ' + element.ospite.partiteGiocate);

                            // console.log('casa.position: ' + element.casa.position);
                            // console.log('ospite.position: ' + element.ospite.position);
                            // console.log('media posizione: ' + ((element.casa.position + element.ospite.position)/2));
                            // console.log('posizioneDiff: ' + posizioneDiff)

                            // console.log('casa.condizione: ' + element.casa.condizione);
                            // console.log('ospite.condizione: ' + element.ospite.condizione);
                            // console.log('media condizione: ' + ((element.casa.condizione + element.ospite.condizione)/2));
                            // console.log('condizioneDiff: ' + condizioneDiff);

                            // console.log('casa.forza: ' + element.casa.forza);
                            // console.log('ospite.forza: ' + element.ospite.forza);
                            // console.log('media forza: ' + ((element.casa.forza + element.ospite.forza)/2));
                            // console.log('forzaDiff: ' + forzaDiff);

                            // console.log('casa.form: ' + element.casa.form);
                            // console.log('ospite.form: ' + element.ospite.form);

                            // console.log('casa.forma: ' + element.casa.forma);
                            // console.log('ospite.forma: ' + element.ospite.forma);

                            // console.log('casa.formaPunti: ' + element.casa.formaPunti + '/' + 15);
                            // console.log('ospite.formaPunti: ' + element.ospite.formaPunti + '/' + 15);
                            // console.log('casa.diffReti: ' + element.casa.diffReti);
                            // console.log('ospite.diffReti: ' + element.ospite.diffReti);

                            console.log('casa.golFatti / casa.partiteGiocate: ' + Math.round(element.casa.golFatti / element.casa.partiteGiocate * 100)/100 + ' (' + element.casa.golFatti + ')');
                            console.log('casa.golFattiCasa / casa.partiteGiocateCasa: ' + Math.round(element.casa.golFattiCasa / element.casa.partiteGiocateCasa * 100)/100 + ' (' + element.casa.golFattiCasa + ')');
                            console.log('casa.golSubiti / casa.partiteGiocate: ' + Math.round(element.casa.golSubiti / element.casa.partiteGiocate * 100)/100 + ' (' + element.casa.golSubiti + ')');
                            console.log('casa.golSubitiCasa / casa.partiteGiocateCasa: ' + Math.round(element.casa.golSubitiCasa / element.casa.partiteGiocateCasa * 100)/100 + ' (' + element.casa.golSubitiCasa + ')');
                            console.log('ospite.golFatti / ospite.partiteGiocate: ' + Math.round(element.ospite.golFatti / element.ospite.partiteGiocate * 100)/100 + ' (' + element.ospite.golFatti + ')');
                            console.log('ospite.golFattiFuori / ospite.partiteGiocateFuori: ' + Math.round(element.ospite.golFattiFuori / element.ospite.partiteGiocateFuori * 100)/100 + ' (' + element.ospite.golFattiFuori + ')');
                            console.log('ospite.golSubiti / ospite.partiteGiocate: ' + Math.round(element.ospite.golSubiti / element.ospite.partiteGiocate * 100)/100 + ' (' + element.ospite.golSubiti + ')');
                            console.log('ospite.golSubitiFuori / ospite.partiteGiocateFuori: ' + Math.round(element.ospite.golSubitiFuori / element.ospite.partiteGiocateFuori * 100)/100 + ' (' + element.ospite.golSubitiFuori + ')');

                            pObj.addText(
                                'diffGolSquadraCasaInCasa: ' + (golFattiSquadraCasaInCasa - golSubitiSquadraCasaInCasa) + '\n' +
                                'diffGolSquadraOspiteInOspite: ' + (golFattiSquadraOspiteInOspite - golSubitiSquadraOspiteInOspite) + '\n' +
                                'casa.golFatti / casa.partiteGiocate: ' + Math.round(element.casa.golFatti / element.casa.partiteGiocate * 100)/100 + '\n' +
                                'casa.golSubiti / casa.partiteGiocate: ' + Math.round(element.casa.golSubiti / element.casa.partiteGiocate * 100)/100 + '\n' +
                                'ospite.golFatti / ospite.partiteGiocate: ' + Math.round(element.ospite.golFatti / element.ospite.partiteGiocate * 100)/100 + '\n' +
                                'ospite.golSubiti / ospite.partiteGiocate: ' + Math.round(element.ospite.golSubiti / element.ospite.partiteGiocate * 100)/100 + '\n',
                                {
                                    color: '000000',
                                    // bold: true,
                                    font_size: 16
                                }
                            );
                            pObj.addLineBreak();

                            // console.log(element.quote)
                            console.log('mediaQuota1: ' + element.mediaQuota1 + ', ' + 'mediaQuotaX: ' + element.mediaQuotaX + ', ' + 'mediaQuota2: ' + element.mediaQuota2)

                            // console.log('\n')
                            console.log('')
                        }
                    }

                })
            } catch (e) {
                console.log(e)
            }

            // console.log(ospitePiuAltoInClassifica.length);
            // console.log(ospitePiuAltoInClassifica = [... new Set(ospitePiuAltoInClassifica)]);
            // console.log(ospitePiuAltoInClassifica);

            // const contextQuote = await browser.newContext();
            // const pageQuote = await contextQuote.newPage();

            try {
                officegenDocx.generate(generatedFile, {
                    'finalize': function(written) {
                        // console.log ('Finish to create a word file!');
                    },
                    'error': function (err) {
                        console.log (err);
                    }
                });

            } catch (e){
                console.log(e)
            }

            await browser.close();
        }
        catch (e) {
            console.log(e)
        }

    })();
// }


