const cheerio = require("cheerio");
// const axios = require("axios");
const fs = require("fs");
const json2csv = require("json2csv").Parser;
const playwright = require('playwright');


const url = 'https://www.flashscore.it/calcio/marocco/botola-pro-2021-2022/risultati';
// const url = 'https://www.flashscore.it/calcio/egitto/premier-league-2021-2022/risultati';
// const url = 'https://www.flashscore.it/calcio/grecia/super-league-2021-2022/risultati';
// const url = 'https://www.flashscore.it/calcio/romania/liga-1-2021-2022/risultati';
// const url = 'https://www.flashscore.it/calcio/romania/liga-2-2021-2022/risultati';
// const url = 'https://www.flashscore.it/calcio/tunisia/ligue-professionnelle-2020-2021/risultati';
// const url = 'https://www.flashscore.it/calcio/argentina/liga-profesional-2022/risultati';
// const url = 'https://www.flashscore.it/calcio/turchia/super-lig-2020-2021/risultati';
// const url = 'https://www.flashscore.it/calcio/turchia/1-lig-2021-2022/risultati';
// const url = 'https://www.flashscore.it/calcio/danimarca/superliga-2021-2022/risultati';
// const url = 'https://www.flashscore.it/calcio/portogallo/liga-portugal-2020-2021/risultati';
// const url = 'https://www.flashscore.it/calcio/portogallo/liga-portugal-2-2020-2021/risultati';
// const url = 'https://www.flashscore.it/calcio/brasile/serie-a-2022/risultati';
// const url = 'https://www.flashscore.it/calcio/brasile/serie-b-2021/risultati';
// const url = 'https://www.flashscore.it/calcio/spagna/laliga-2020-2021/risultati';
// const url = 'https://www.flashscore.it/calcio/spagna/laliga2-2020-2021/risultati';
// const url = 'https://www.flashscore.it/calcio/camerun/elite-one-2021-2022/risultati';
// const url = 'https://www.flashscore.it/calcio/cile/primera-division-2022/risultati';
// const url = 'https://www.flashscore.it/calcio/svezia/allsvenskan-2022/risultati';
// const url = 'https://www.flashscore.it/calcio/inghilterra/premier-league-2007-2008/risultati';
// const url = 'https://www.flashscore.it/calcio/francia/ligue-1-2021-2022/risultati';
// const url = 'https://www.flashscore.it/calcio/olanda/eredivisie-2020-2021/risultati';
// const url = 'https://www.flashscore.it/calcio/olanda/eerste-divisie-2020-2021/risultati';
// const url = 'https://www.flashscore.it/calcio/colombia/primera-a-2021/risultati';
// const url = 'https://www.flashscore.it/calcio/germania/bundesliga-2020-2021/risultati';
// const url = 'https://www.flashscore.it/calcio/germania/2-bundesliga-2020-2021/risultati';
// const url = 'https://www.flashscore.it/calcio/italia/serie-a-2020-2021/risultati';
// const url = 'https://www.flashscore.it/calcio/italia/serie-b-2011-2012/risultati';
// const url = 'https://www.flashscore.it/calcio/italia/serie-c-girone-a-2021-2022/risultati';

(async () => {
    const browser = await playwright.chromium/*firefox*//*webkit*/.launch({
        // headless: false,
        slowMo: 500,
        // waitForInitialPage: true,
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

    while(await page.$("#live-table > div.event.event--results > div > div > a") !== null){
        await page.click("#live-table > div.event.event--results > div > div > a", {
            force: true
        });
    }

    const html = await page.content();

    // console.log(html)
    // console.log(url.slice(8).replace(/\//g, "____").replace(/____/g, "/").replace('www', 'https://www'))

    fs.writeFileSync(`./html/risultati/${url.slice(8).replace(/\//g, "____")}.html`, html)

    const $ = cheerio.load(html);
    // console.log($);


    // let giornate = $("div.sportName.soccer").find("div.event__match.event__match--static.event__match--twoLine")/*.first()*/.text();
    // let pageText = $("div.sportName.soccer")/*.first()*/.text();
    // let pageSection = $("div.sportName.soccer");
    // let partite = $("div.sportName.soccer").find(`div[title="Clicca per i dettagli dell'incontro!"]`)/*.first()*/.text();
    // let partite1 = $("div.sportName.soccer").find("div.event__round.event__round--static")/*.first()*/.text();
    // console.log(giornate.split('Giornata '))
    // console.log(partite)

    let c = 0;

    // pageText.split('Giornata ').forEach(function(element) {
    //     let giornate = element.split('. ');
    //     // console.log(c)
    //
    //     // console.log('giornate');
    //     // console.log(giornate);
    //     // console.log(giornate[0]);
    //
    //     // giornate.forEach(function(giornateElement) { })
    //     let partite = [];
    //     for(let i = 0; i < giornate.length; i++){
    //         // console.log(giornate[i])
    //         // console.log(giornate[i].slice(5).split('('))
    //         // 16:00ChelseaBlackburn21(2)(0)13.05
    //
    //         giornate[i].slice(5).split('(').forEach(function(element0) {
    //             // console.log(element0.split(')'))
    //         })
    //
    //         let partita = {
    //             giornata: parseInt(giornate[0].slice(0, 2)),
    //             orario: giornate[i].slice(0, 5),
    //         };
    //         partite.push(partita)
    //
    //         // console.log(partita)
    //
    //         // console.log('\n')
    //     }
    //     // console.log(partite)
    //
    //     // console.log('\n')
    //
    //     c++;
    // });

    let partite = [];
    let giornataNome = $("div.event__match.event__match--static.event__match--twoLine").first().text().split(' ')[1];
    let nazioneNome = $("span.event__title--type").first().text();
    let eventoNome = $("div.event.event--results span.event__title--name").first().text();
    let eventType = $("a.event__info.active").first().text();
    let stagione = $("div.heading__info").first().text();
    // console.log('nazioneNome');
    // console.log(nazioneNome);
    // console.log('eventoNome');
    // console.log(eventoNome);
    // console.log('eventType');
    // console.log(eventType);

    // await page.click("#g_1_jV4anjfr", {});

    // const pageRim = await context.newPage();
    // await pageRim.goto("https://www.programsbuzz.com/")
    // const htmlQuote1x2 = await pageRim.content();
    // console.log(htmlQuote1x2)
    //
    // const [newPage1] = await Promise.all([
    //     context.waitForEvent('page'),
    //     // This action triggers the new tab
    //     // pageRim.locator('text=By iVagus Services Pvt. Ltd.').click(),
    //     page.click('a[target="_blank"]') // Opens a new tab
    //
    // ]);
    // await newPage1.waitForLoadState();
    // console.log(await newPage1.title());

    $("div.event__match.event__match--static.event__match--twoLine").each(async function(i, element) {
        let partitaId = $(element).attr('id');
        let dataPartita = $(element).find("div.event__time").text();
        let squadraCasa = $(element).find("div.event__participant.event__participant--home").text();
        let squadraOspite = $(element).find("div.event__participant.event__participant--away").text();
        let golSquadraCasa = parseInt($(element).find("div.event__score.event__score--home").text());
        let golSquadraOspite = parseInt($(element).find("div.event__score.event__score--away").text());
        let golSquadraCasaPrimoTempo = parseInt($(element).find("div.event__part.event__part--home.event__part--1").text().slice(1, -1));
        let golSquadraOspitePrimoTempo = parseInt($(element).find("div.event__part.event__part--away.event__part--1").text().slice(1, -1));

        let urlQuote = `https://www.flashscore.it/partita/${partitaId}/#/informazioni-partita/informazioni-partita`;
        // console.log('partitaId');
        // console.log(partitaId);


        // try {
        //     // #detail > div.tabs.tabs__detail > div > a:nth-child(2)
        //     let gfjvfn = `#${partitaId}`;
        //     // console.log('gfjvfn');
        //     // console.log(gfjvfn);
        //
        //     // await page.waitForSelector(gfjvfn);
        //     const [newPage1] = await Promise.all([
        //         context.waitForEvent('page'),
        //         // This action triggers the new tab
        //         // pageRim.locator('text=By iVagus Services Pvt. Ltd.').click(),
        //         // page.click('a[target="_blank"]') // Opens a new tab
        //         // page.click(gfjvfn, {
        //         //     // force: true,
        //         //     timeout: 1500
        //         // })
        //         page.waitForSelector(gfjvfn),
        //         page.locator(`#${partitaId}`).click(),
        //         page.click(gfjvfn, {
        //             // force: true,
        //             // timeout: 1500
        //         })
        //     ]);
        //     await newPage1.waitForLoadState();
        //     let htmlQuote1x2 = await newPage1.content();
        //
        //     console.log(await newPage1.innerText(`#detail > div.tabs.tabs__detail > div > a:nth-child(2)`));
        //     if(await newPage1.innerText(`#detail > div.tabs.tabs__detail > div > a:nth-child(2)`) === 'COMP. QUOTE'){
        //         await newPage1.click(`#detail > div.tabs.tabs__detail > div > a:nth-child(2)`, {
        //             force: true,
        //             timeout: 0
        //         });
        //     }
        //
        //     console.log(await newPage1.url());
        //     fs.writeFileSync(`./html/quote1x2/${(await newPage1.url()).slice(8).replace(/\//g, "____")}.html`, htmlQuote1x2)
        //     // fs.writeFileSync(`./html/quote1x2/fvfvffgb.html`, htmlQuote1x2)
        //     await newPage1.close();
        //
        // } catch (e) {
        //     console.log(e)
        // }

        // await newPage1.waitForSelector();
        // let ccccfgggj = await page.locator(`#${partitaId}`).click();

        // let ccccfgggji = await page.locator(`#${partitaId}`);
        // ccccfgggji.click();
        // console.log(await ccccfgggji.innerText());
        // const handle = await page.$(`#${partitaId}`);
        // console.log(handle)

        // const pageTwo = await context.newPage();
        // await page.click(`#${partitaId}`, {});
        // const browserQuote = await playwright./*chromium*//*firefox*/webkit.launch({
        //     headless: false,
        //     slowMo: 500,
        //     // waitForInitialPage: true,
        // });
        // const contextQuote = await browserQuote.newContext();
        // const pageQuote = await contextQuote.newPage();
        // await pageQuote.goto(urlQuote, {
        //     timeout: 0
        // });
        // await pageQuote.click(`#${partitaId}`, {});

        // const htmlQuote1x2 = await /*pageQuote*/newPage1.content();
        // fs.writeFileSync(`./html/quote1x2/${urlQuote.slice(8).replace(/\//g, "____")}.html`, htmlQuote1x2)
        // // const $ = cheerio.load(htmlQuote1x2);


        if($(element).prev().prev().find("a.event__info.active").text().trim() !== ''){
            eventType = $(element).prev().prev().find("a.event__info.active").text();
        }
        // console.log('eventType1')
        // console.log(eventType)
        // console.log('eventoNome')
        // console.log(eventoNome)

        // console.log(i)
        // console.log($(element).text())
        // console.log(squadraCasa + ' - ' + squadraOspite)

        // console.log($(element).prev().text().split(' ')[0] === 'Giornata');

        // if($(element).prev().text().split(' ')[0] === 'Giornata' && $(element).prev().text().split(' ')[1] !== giornataNome){
        //     giornataNome = $(element).prev().text().split(' ')[1];
        // }
        if($(element).prev().text().split(' ')[0] === 'Giornata'){
            if($(element).prev().text().split(' ')[1] !== giornataNome){
                giornataNome = $(element).prev().text().split(' ')[1];
            }
            // else {
            //     giornataNome = $(element).prev().text();
            // }
        }

        if($(element).prev().prev().text().slice/*substr*/(0, nazioneNome.length) === nazioneNome && $(element).prev().prev().text() !== eventoNome && eventType !== ''){
            eventoNome = $(element).prev().prev().text().slice(nazioneNome.length, - eventType.length);
        }

        let match = {
            id: partitaId.slice(4),
            nazione: nazioneNome,
            evento: eventoNome,
            stagione,
            giornata: parseInt(giornataNome),
            // dataPartita,
            data: dataPartita.split('. ')[0],
            orario: dataPartita.split('. ')[1],
            squadraCasa,
            squadraOspite,
            golSquadraCasa,
            golSquadraOspite,
            golSquadraCasaPrimoTempo,
            golSquadraOspitePrimoTempo
        };
        partite.push(match);

        // console.log('')
        // await browserQuote.close();
    })


    let eventi = new Set();
    for(let i = 0; i < partite.length; i++){
        // console.log(i)
        eventi.add(partite[i].evento);
    }
    // console.log(eventi)
    // console.log(eventi.size)

    // inserisco la quantità di partite per ogni evento e il nome dell evento per ogni evento
    let eventiOrdinati = []
    for(let i = 0; i < partite.length; i++){
        let numPartiteEvento = partite.filter(function (element) {
            // console.log(element.evento)
            return element.evento === partite[i].evento;
        }).length;

        eventiOrdinati.push({
            evento: partite[i].evento,
            giornataMax: 0,
            numPartiteEvento,
            partite: [],
            squadre: new Set()
        });
    }

    eventiOrdinati = eventiOrdinati.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.evento === value.evento /*&& t.partite === value.partite*/
        ))
    )
    // console.log(eventoTemp)

    eventiOrdinati.sort((a, b) => b.numPartiteEvento - a.numPartiteEvento);
    // eventiOrdinati.sort((a, b) => b.partite.length - a.partite.length);

    partite.reverse();

    // console.log(partite)
    console.log(partite.length)
    // console.log(partite[partite.length-1])

    // aggiungo le squadre ad ogni evento della competizione
    for(let i = 0; i < eventiOrdinati.length; i++) {
        for(let j = 0; j < partite.length; j++){
            // console.log(partite[i].evento)
            // console.log(eventiOrdinati[0])
            // console.log('')
            if(partite[j].evento === eventiOrdinati[i].evento){
                eventiOrdinati[i].squadre.add(partite[j].squadraCasa);
            }
        }
    }

    // aggiungo le partite ad ogni evento della competizione
    for(let i = 0; i < eventiOrdinati.length; i++) {
        for(let j = 0; j < partite.length; j++) {
            // console.log(partite[i].evento)
            // console.log(eventiOrdinati[0])
            // console.log('')
            if(partite[j].evento === eventiOrdinati[i].evento){
                // squadreEventoPrincipale.add(partite[j].squadraCasa);
                eventiOrdinati[i].partite.push(partite[j]);
            }
        }
    }

    // riempio il campo giornataMax per ogni evento della competizione
    for(let i = 0; i < eventiOrdinati.length; i++) {
        for(let j = 0; j < eventiOrdinati[i].partite.length; j++) {
            eventiOrdinati[i].giornataMax = Math.max.apply(Math, eventiOrdinati[i].partite.map(function(o) {
                if(!isNaN(o.giornata)){
                    return o.giornata;
                }
            }));
        }
    }

    console.log(eventiOrdinati)

    let eventIndex = 0; // evento per il quale si vuole scommettere
    let giornataIndex = 0;
    let partiteInSchedina = [];
    //todo: se si vuole scommettere su tutte le giornate lasciare giornatamax
    // altrimenti inserire la giornata specifica
    for(let u = 1; u <= /*eventiOrdinati[eventIndex].giornataMax*/1; u++) {
        let squadre1 = [];
        let partiteGiocate = [];
        // let partiteForma = [];
        let prossimePartite = [];
        for(let i = eventIndex; i <= eventIndex/*eventiOrdinati.length-1*/; i++) {
            // console.log(eventiOrdinati[i].partite)
            // console.log(eventiOrdinati[i].partite.length)

            // aggiungo le squadre della competizione
            let squadre0 = new Set();
            for(let j = 0; j < eventiOrdinati[i].partite.length; j++){
                // console.log(i)
                squadre0.add(eventiOrdinati[i].partite[j].squadraCasa);
                squadre0.add(eventiOrdinati[i].partite[j].squadraOspite);
            }
            // console.log(squadre0);

            // creo gli oggetti 'squadra'
            squadre0.forEach(key => {
                // console.log(i)
                // console.log(key)
                let squadra = {
                    nome: key,
                    posizione: null,
                    punti: 0,
                    partiteGiocate: 0,
                    partiteVinte: 0,
                    partitePareggiate: 0,
                    partitePerse: 0,
                    golFatti: 0,
                    golSubiti: 0,
                    golFattiCasa: 0,
                    golSubitiCasa: 0,
                    golFattiFuori: 0,
                    golSubitiFuori: 0,
                    // diffReti: 0,
                    condizione: null,
                    forza: null,
                    forma: []
                }
                // squadre1.add(squadra);
                squadre1.push(squadra);
            })

            // console.log(squadre1);

            // aggiungo le partite <= alla giornata
            for(let j = 0; j < eventiOrdinati[i].partite.length; j++) {
                if(eventiOrdinati[i].partite[j].giornata <= giornataIndex) {
                    // console.log(eventiOrdinati[i].partite[j])
                    partiteGiocate.push(eventiOrdinati[i].partite[j]);
                }
            }

            // per ogni squadra aggiungo le partite in forma
            squadre1.forEach(key => {
                for(let j = 0; j < eventiOrdinati[i].partite.length; j++) {
                    if(eventiOrdinati[i].partite[j].squadraCasa === key.nome || eventiOrdinati[i].partite[j].squadraOspite === key.nome) {
                        if (eventiOrdinati[i].partite[j].giornata <= giornataIndex) {
                            if (eventiOrdinati[i].partite[j].giornata >= giornataIndex - 4) {
                                // console.log(eventiOrdinati[i].partite[j])
                                key.forma.push(eventiOrdinati[i].partite[j]);
                            }
                        }
                    }
                }
            })

            // aggiungo a 'prossimePartite' le partite della prossima giornata
            for(let j = 0; j < eventiOrdinati[i].partite.length; j++) {
                if(eventiOrdinati[i].partite[j].giornata === (giornataIndex + 1)){
                    // console.log(eventiOrdinati[i].partite[j])
                    // prossimePartite.push(eventiOrdinati[i].partite[j])
                    prossimePartite.push({
                        id: eventiOrdinati[i].partite[j].id,
                        nazione: eventiOrdinati[i].partite[j].nazione,
                        evento: eventiOrdinati[i].partite[j].evento,
                        stagione: eventiOrdinati[i].partite[j].stagione,
                        giornata: eventiOrdinati[i].partite[j].giornata,
                        // dataPartita,
                        data: eventiOrdinati[i].partite[j].data,
                        orario: eventiOrdinati[i].partite[j].orario,
                        squadraCasa: eventiOrdinati[i].partite[j].squadraCasa,
                        squadraOspite: eventiOrdinati[i].partite[j].squadraOspite,
                        golSquadraCasa: eventiOrdinati[i].partite[j].golSquadraCasa,
                        golSquadraOspite: eventiOrdinati[i].partite[j].golSquadraOspite,
                        casa: {},
                        ospite: {},
                        quote: []
                    })
                }
            }

            // riempio gli oggetti di ogni squadra in classifica
            squadre1.forEach(key => {
                // console.log(squadre1[j].nome);
                // console.log(key);
                for(let k = 0; k < partiteGiocate.length; k++) {
                    if(partiteGiocate[k].squadraCasa === key.nome){
                        key.partiteGiocate++;

                        key.golFattiCasa += partiteGiocate[k].golSquadraCasa;
                        key.golFatti += partiteGiocate[k].golSquadraCasa;
                        key.golSubitiCasa += partiteGiocate[k].golSquadraOspite;
                        key.golSubiti += partiteGiocate[k].golSquadraOspite;

                        if(partiteGiocate[k].golSquadraCasa > partiteGiocate[k].golSquadraOspite){
                            key.partiteVinte++;
                            key.punti += 3;
                        }
                        else if(partiteGiocate[k].golSquadraCasa < partiteGiocate[k].golSquadraOspite){
                            key.partitePerse++;
                        }
                        else if(partiteGiocate[k].golSquadraCasa === partiteGiocate[k].golSquadraOspite){
                            key.partitePareggiate++;
                            key.punti += 1;
                        }
                    }
                    else if(partiteGiocate[k].squadraOspite === key.nome) {
                        key.partiteGiocate++;

                        key.golFattiFuori += partiteGiocate[k].golSquadraOspite;
                        key.golFatti += partiteGiocate[k].golSquadraOspite;
                        key.golSubitiFuori += partiteGiocate[k].golSquadraCasa;
                        key.golSubiti += partiteGiocate[k].golSquadraCasa;

                        if(partiteGiocate[k].golSquadraCasa < partiteGiocate[k].golSquadraOspite){
                            key.partiteVinte++;
                            key.punti += 3;
                        }
                        else if(partiteGiocate[k].golSquadraCasa > partiteGiocate[k].golSquadraOspite){
                            key.partitePerse++;
                        }
                        else if(partiteGiocate[k].golSquadraCasa === partiteGiocate[k].golSquadraOspite){
                            key.partitePareggiate++;
                            key.punti += 1;
                        }
                    }
                }
            })

            // ordino le squadre nella classifica
            squadre1.sort(function(b, a) {
                if(a.punti === b.punti){
                    return (a.golFatti - a.golSubiti) - (b.golFatti - b.golSubiti);
                }
                return a.punti - b.punti;
            });

        }

        // aggiungo gli oggetti 'squadraObj' in array forma per ogni squadra in classifica
        for(let i = 0; i < squadre1.length; i++) {
            squadre1[i].posizione = i + 1;
            for(let j = 0; j < squadre1[i].forma.length; j++) {
                squadre1.forEach(key => {
                    if(key.nome === squadre1[i].forma[j].squadraCasa) {
                        squadre1[i].forma[j].squadraCasaObj = key;
                    } else if(key.nome === squadre1[i].forma[j].squadraOspite) {
                        squadre1[i].forma[j].squadraOspiteObj = key;
                    }
                })
            }
        }

        // riempio gli oggetti 'casa' e 'ospite' per tutte le prossime partite
        for(let i = 0; i < prossimePartite.length; i++) {
            squadre1.forEach(key => {
                if(key.nome === prossimePartite[i].squadraCasa) {
                    prossimePartite[i].casa = key;
                }
                else if(key.nome === prossimePartite[i].squadraOspite) {
                    prossimePartite[i].ospite = key;
                }
            })
        }

        //todo: prende le quote ed è funzionante anche se fa cilecca ogni tanto
        /*for(let i = 0; i < prossimePartite.length; i++){
            // console.log(prossimePartite[i].id)
            const [newPage1] = await Promise.all([
                context.waitForEvent('page'),
                // This action triggers the new tab
                // pageRim.locator('text=By iVagus Services Pvt. Ltd.').click(),
                // page.click('a[target="_blank"]') // Opens a new tab
                page.waitForSelector(`#g_1_${prossimePartite[i].id}`),
                // page.locator(`#${attrId}`).click(),
                page.click(`#g_1_${prossimePartite[i].id}`, {
                    // force: true,
                    timeout: 5000
                })
            ]);
            await newPage1.waitForLoadState();

            console.log(await newPage1.url());

            // console.log(await newPage1.innerText(`#detail > div.tabs.tabs__detail > div > a:nth-child(2)`));
            if(await newPage1.innerText(`#detail > div.tabs.tabs__detail > div > a:nth-child(2)`) === 'COMP. QUOTE'){
                await newPage1.click(`#detail > div.tabs.tabs__detail > div > a:nth-child(2)`, {
                    // force: true,
                    timeout: 5000
                });
            }

            let htmlQuote1x2 = await newPage1.content();
            // console.log(htmlQuote1x2);

            // await new Promise(resolve => setTimeout(resolve, 1000));

            const $ = cheerio.load(htmlQuote1x2);

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
                    console.log('(1): ' + quota1 + ', ' + '(X): ' + quotaX + ', ' + '(2): ' + quota2)
                    // console.log('quota 1: ' + quota1)
                    // console.log('quota X: ' + quotaX)
                    // console.log('quota 2: ' + quota2)

                    // console.log('')

                    prossimePartite[i].quote.push({
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

            //todo: parsificare le quote
            // for(let j = 1; j < 10; j++){
            //     console.log(await newPage1.locator(`#detail > div:nth-child(7) > div.oddsTab__tableWrapper > div > div.ui-table__body > div:nth-child(${j.toString()})`).innerText())
                // console.log(await newPage1.locator(`#detail > div:nth-child(7) > div.oddsTab__tableWrapper > div > div.ui-table__body > div:nth-child(${j.toString()})`).getAttribute('title'))
                // const radios = await page.locator(`#detail > div:nth-child(7) > div.oddsTab__tableWrapper > div > div.ui-table__body > div:nth-child(${j.toString()})`);
                // const count = await radios.count();
                // for(let k = 0; k < count; k++) {
                //     // let hohno = await radios.nth(k).click();
                //     let hohno = await radios.nth(k).getAttribute('title');
                //     console.log('hohno')
                //     console.log(hohno)
                // }
                // for(let k = 1; k <= 3; k++){
                //     // #detail > div:nth-child(7) > div.oddsTab__tableWrapper > div > div.ui-table__body > div:nth-child(4) > a.oddsCell__odd
                //     let hhggbb = `#detail > div:nth-child(7) > div.oddsTab__tableWrapper > div > div.ui-table__body > div:nth-child(${j.toString()}) > a:nth-child(${k.toString()})`;
                //     // let hhggbb = `#detail > div:nth-child(7) > div.oddsTab__tableWrapper > div > div.ui-table__body > div:nth-child(${j.toString()}) > a.oddsCell__odd`;
                //     console.log(hhggbb)
                //     await page.hover(hhggbb)
                //     await page.waitForSelector(hhggbb)
                //     console.log(await newPage1.locator(hhggbb).getAttribute('title'))
                // }
            // }

            // fs.writeFileSync(`./html/quote1x2/${(await newPage1.url()).slice(8).replace(/\//g, "____")}.html`, htmlQuote1x2)

            // console.log('\n')
            console.log()

            await newPage1.close();
        }*/


        // // await setTimeout(function() {
        // for(let i = 0; i < prossimePartite.length; i++){
        //     console.log(i)
        //     console.log(prossimePartite[i].squadraCasa + ' - ' + prossimePartite[i].squadraOspite)
        //     console.log(prossimePartite[i].quote)
        //     // for(let j = 0; j < prossimePartite[i].quote.length; j++) {
        //     //     console.log(prossimePartite[i].quote[j])
        //     // }
        // }
        // // }, 5000);

        /*// const radios = await page.locator('[type="radio"]');
        // const count = await radios.count();
        // for (let i = 0; i < count; i++) {
        //     await radios.nth(i).click();
        // }
        const arrayOfLocators = page.locator('div.event__match.event__match--static.event__match--twoLine');
        const elementsCount = await arrayOfLocators.count();
        let texts = [];
        for(let index = 0; index < elementsCount; index++) {
            const element = await arrayOfLocators.nth(index);
            const innerText = await element.innerText();
            const attrId = await element.getAttribute('id');
            // texts.push(innerText);
            console.log(innerText)
            console.log(attrId)

            const [newPage1] = await Promise.all([
                context.waitForEvent('page'),
                // This action triggers the new tab
                // pageRim.locator('text=By iVagus Services Pvt. Ltd.').click(),
                // page.click('a[target="_blank"]') // Opens a new tab
                page.waitForSelector(`#${attrId}`),
                // page.locator(`#${attrId}`).click(),
                page.click(`#${attrId}`, {
                    // force: true,
                    // timeout: 1500
                })
            ]);
            await newPage1.waitForLoadState();

            // let htmlQuote1x2 = await newPage1.content(); //per prendere gli eventi della prima tab

            console.log(await newPage1.url());
            console.log(await newPage1.innerText(`#detail > div.tabs.tabs__detail > div > a:nth-child(2)`));
            if(await newPage1.innerText(`#detail > div.tabs.tabs__detail > div > a:nth-child(2)`) === 'COMP. QUOTE'){
                await newPage1.click(`#detail > div.tabs.tabs__detail > div > a:nth-child(2)`, {
                    // force: true,
                    timeout: 0
                });
            }

            let htmlQuote1x2 = await newPage1.content();
            console.log(htmlQuote1x2);

            fs.writeFileSync(`./html/quote1x2/${(await newPage1.url()).slice(8).replace(/\//g, "____")}.html`, htmlQuote1x2)
            // fs.writeFileSync(`./html/quote1x2/fvfvffgb.html`, htmlQuote1x2)

            await newPage1.close();
            // console.log(texts)
        }*/


        // valutazione delle squadre
        const coefficienteSconfittaCasa = 1;
        const coefficienteSconfittaFuori = 3;
        const coefficientePareggioCasa = /*1*/5;
        const coefficientePareggioFuori = /*1.8*/9;
        const coefficienteVittoriaCasa = /*2.2*/11;
        const coefficienteVittoriaFuori = /*3*/15;
        const coefficienteGiornata = 1;
        const coefficienteQuartUltimaGiornata = 0.9;
        const coefficienteQuintUltimaGiornata = 0.85;
        squadre1.forEach(function(element) {
            let condizione = 0;
            for(let i = 0; i < element.forma.length; i++){
                if(element.forma[i].squadraCasa === element.nome){
                    if(element.forma[i].golSquadraCasa > element.forma[i].golSquadraOspite){
                        if(element.forma[i].giornata === giornataIndex - 4){
                            condizione += (coefficienteQuintUltimaGiornata * coefficienteVittoriaCasa * ((squadre1.length + 1 - element.forma[i].squadraOspiteObj.posizione) * 1));
                        }
                        else if(element.forma[i].giornata === giornataIndex - 3){
                            condizione += (coefficienteQuartUltimaGiornata * coefficienteVittoriaCasa * ((squadre1.length + 1 - element.forma[i].squadraOspiteObj.posizione) * 1));
                        }
                        else {
                            condizione += (coefficienteGiornata * coefficienteVittoriaCasa * ((squadre1.length + 1 - element.forma[i].squadraOspiteObj.posizione) * 1));
                        }
                    }
                    else if(element.forma[i].golSquadraCasa < element.forma[i].golSquadraOspite){
                        if(element.forma[i].giornata === giornataIndex - 4){
                            condizione += (coefficienteQuintUltimaGiornata * coefficienteSconfittaCasa * ((squadre1.length + 1 - element.forma[i].squadraOspiteObj.posizione) * 1));
                        }
                        else if(element.forma[i].giornata === giornataIndex - 3){
                            condizione += (coefficienteQuartUltimaGiornata * coefficienteSconfittaCasa * ((squadre1.length + 1 - element.forma[i].squadraOspiteObj.posizione) * 1));
                        }
                        else {
                            condizione += (coefficienteGiornata * coefficienteSconfittaCasa * ((squadre1.length + 1 - element.forma[i].squadraOspiteObj.posizione) * 1));
                        }
                    }
                    else if(element.forma[i].golSquadraCasa === element.forma[i].golSquadraOspite){
                        if(element.forma[i].giornata === giornataIndex - 4){
                            condizione += (coefficienteQuintUltimaGiornata * coefficientePareggioCasa * ((squadre1.length + 1 - element.forma[i].squadraOspiteObj.posizione) * 1));
                        }
                        else if(element.forma[i].giornata === giornataIndex - 3){
                            condizione += (coefficienteQuartUltimaGiornata * coefficientePareggioCasa * ((squadre1.length + 1 - element.forma[i].squadraOspiteObj.posizione) * 1));
                        }
                        else {
                            condizione += (coefficienteGiornata * coefficientePareggioCasa * ((squadre1.length + 1 - element.forma[i].squadraOspiteObj.posizione) * 1));
                        }
                    }
                }
                else if(element.forma[i].squadraOspite === element.nome){
                    if(element.forma[i].golSquadraCasa > element.forma[i].golSquadraOspite){
                        if(element.forma[i].giornata === giornataIndex - 4){
                            condizione += (coefficienteQuintUltimaGiornata * coefficienteSconfittaFuori * ((squadre1.length + 1 - element.forma[i].squadraCasaObj.posizione) * 1));
                        }
                        else if(element.forma[i].giornata === giornataIndex - 3){
                            condizione += (coefficienteQuartUltimaGiornata * coefficienteSconfittaFuori * ((squadre1.length + 1 - element.forma[i].squadraCasaObj.posizione) * 1));
                        }
                        else {
                            condizione += (coefficienteGiornata * coefficienteSconfittaFuori * ((squadre1.length + 1 - element.forma[i].squadraCasaObj.posizione) * 1));
                        }
                    }
                    else if(element.forma[i].golSquadraCasa < element.forma[i].golSquadraOspite){
                        if(element.forma[i].giornata === giornataIndex - 4){
                            condizione += (coefficienteQuintUltimaGiornata * coefficienteVittoriaFuori * ((squadre1.length + 1 - element.forma[i].squadraCasaObj.posizione) * 1));
                        }
                        else if(element.forma[i].giornata === giornataIndex - 3){
                            condizione += (coefficienteQuartUltimaGiornata * coefficienteVittoriaFuori * ((squadre1.length + 1 - element.forma[i].squadraCasaObj.posizione) * 1));
                        }
                        else {
                            condizione += (coefficienteGiornata * coefficienteVittoriaFuori * ((squadre1.length + 1 - element.forma[i].squadraCasaObj.posizione) * 1));
                        }
                    }
                    else if(element.forma[i].golSquadraCasa === element.forma[i].golSquadraOspite){
                        if(element.forma[i].giornata === giornataIndex - 4){
                            condizione += (coefficienteQuintUltimaGiornata * coefficientePareggioFuori * ((squadre1.length + 1 - element.forma[i].squadraCasaObj.posizione) * 1));
                        }
                        else if(element.forma[i].giornata === giornataIndex - 3){
                            condizione += (coefficienteQuartUltimaGiornata * coefficientePareggioFuori * ((squadre1.length + 1 - element.forma[i].squadraCasaObj.posizione) * 1));
                        }
                        else {
                            condizione += (coefficienteGiornata * coefficientePareggioFuori * ((squadre1.length + 1 - element.forma[i].squadraCasaObj.posizione) * 1));
                        }
                    }
                }
            }

            let condizioneFormula = condizione/squadre1.length;
            element.condizione = Math.round(condizioneFormula * 100)/100;
            element.forza = Math.round((((squadre1.length + 1 - element.posizione) + condizioneFormula)/2) * 100)/100;
        })

        // console.log(partiteGiocate)

        // console.log(squadre1) //todo: classifica

        // console.log(prossimePartite);

        for(let i = 0; i < squadre1.length; i++){
            // console.log(squadre1[i].nome);
            // console.log(squadre1[i].forma);
            // console.log(squadre1[i].condizione);
            // console.log(squadre1[i].forza);
            // console.log();
        }

        // scelta delle partite
        try {
            prossimePartite.forEach(function(element) {
                // console.log(element.casa)
                // let posizioneDiff = element.casa.posizione - element.ospite.posizione;
                let condizioneDiff = element.casa.condizione - element.ospite.condizione;
                let forzaDiff = element.casa.forza - element.ospite.forza;
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

                element.casa.forma.forEach(function(casaElement) {
                    // console.log(element);
                    // console.log(element.casa.team);
                    // console.log('casaPosizione: ' + element.casa.position);
                    // console.log(casaElement.squadraCasa);
                    // console.log(casaElement.squadraOspite);
                    // console.log('\n')
                    if(casaElement.squadraCasaObj.nome.trim() === element.casa.nome.trim()){
                        partiteSquadraCasaInCasa++;
                        golFattiSquadraCasaInCasa += casaElement.golSquadraCasa;
                        golSubitiSquadraCasaInCasa += casaElement.golSquadraOspite;

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
                    else if(casaElement.squadraOspiteObj.nome.trim() === element.casa.nome.trim()){
                        partiteSquadraCasaInOspite++;
                        golFattiSquadraCasaInOspite += casaElement.golSquadraOspite;
                        golSubitiSquadraCasaInOspite += casaElement.golSquadraCasa;

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
                    if(ospiteElement.squadraCasaObj.nome.trim() === element.ospite.nome.trim()){
                        partiteSquadraOspiteInCasa++;
                        golFattiSquadraOspiteInCasa += ospiteElement.golSquadraCasa;
                        golSubitiSquadraOspiteInCasa += ospiteElement.golSquadraOspite;

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
                    else if(ospiteElement.squadraOspiteObj.nome.trim() === element.ospite.nome.trim()){
                        partiteSquadraOspiteInOspite++;
                        golFattiSquadraOspiteInOspite += ospiteElement.golSquadraOspite;
                        golSubitiSquadraOspiteInOspite += ospiteElement.golSquadraCasa;

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

                if(
                    // element.casa.posizione - element.ospite.posizione > 0 &&
                    // element.casa.posizione - element.ospite.posizione < (squadre1.length * 1.8 / 4) &&
                    // element.casa.posizione <= (squadre1.length * 2.5 / 4) &&
                    // (element.ospite.punti / element.casa.punti) < 1.5 &&
                    // (element.casa.golFatti / element.casa.partiteGiocate) >= 1.1 &&
                    // (element.casa.golSubiti / element.casa.partiteGiocate) <= 1.1 &&
                    // (element.ospite.golFatti / element.ospite.partiteGiocate) >= 1.2 &&
                    // (element.ospite.golSubiti / element.ospite.partiteGiocate) <= 1.1 &&
                    // (golFattiSquadraCasaInCasa - golSubitiSquadraCasaInCasa) >= 0 &&
                    // Math.abs((golFattiSquadraCasaInCasa - golSubitiSquadraCasaInCasa) - (golFattiSquadraOspiteInOspite - golSubitiSquadraOspiteInOspite)) <= 5 //&&
                    // (element.ospite.golFatti / element.casa.golFatti) >= 1.2 // &&
                    // (element.ospite.golSubiti / element.casa.golSubiti) >= 1.1 /*&&*/
                    // ((element.casa.posizione + element.ospite.posizione)/2) <= squadre1.length/2 /*&&*/
                    // && element.casa.forza - element.ospite.forza > -4 &&
                    // element.casa.forza - element.ospite.forza < 3
                    // element.ospite.forza / element.casa.forza > 1.05 &&
                    // element.ospite.forza / element.casa.forza < 1.3
                    1
                ){

                    partiteInSchedina.push(element);

                    // console.log(element)
                    // console.log(element.dataPartita);
                    // pObj.addText(element.dataPartita, {
                    //     color: '000000',
                    //     // bold: true,
                    //     font_size: 16
                    // });
                    // pObj.addLineBreak();
                    // console.log(element.casa.team + ' - ' + element.ospite.team)
                    console.log(element.casa.nome + '(' + element.casa.posizione + ')' + '(' + element.casa.punti + ')' + '(' + element.casa.forza + ')' + ' - ' + element.ospite.nome + '(' + element.ospite.posizione + ')' + '(' + element.ospite.punti + ')' + '(' + element.ospite.forza + ')');
                    // pObj.addText(element.casa.team + '(' + element.casa.position + ')' + '(' + element.casa.punti + ')' + '(' + element.casa.forza + ')' + ' - ' + element.ospite.team + '(' + element.ospite.position + ')' + '(' + element.ospite.punti + ')' + '(' + element.ospite.forza + ')', {
                    //     color: '000000',
                    //     bold: true,
                    //     font_size: 16
                    // });
                    // pObj.addLineBreak();

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
                    console.log('casa.golFatti / casa.partiteGiocate: ' + Math.round(element.casa.golFatti / element.casa.partiteGiocate * 100)/100);
                    console.log('casa.golSubiti / casa.partiteGiocate: ' + Math.round(element.casa.golSubiti / element.casa.partiteGiocate * 100)/100);
                    console.log('ospite.golFatti / ospite.partiteGiocate: ' + Math.round(element.ospite.golFatti / element.ospite.partiteGiocate * 100)/100);
                    console.log('ospite.golSubiti / ospite.partiteGiocate: ' + Math.round(element.ospite.golSubiti / element.ospite.partiteGiocate * 100)/100);

                    // pObj.addText(
                    //     'diffGolSquadraCasaInCasa: ' + (golFattiSquadraCasaInCasa - golSubitiSquadraCasaInCasa) + '\n' +
                    //     'diffGolSquadraOspiteInOspite: ' + (golFattiSquadraOspiteInOspite - golSubitiSquadraOspiteInOspite) + '\n' +
                    //     'casa.golFatti / casa.partiteGiocate: ' + Math.round(element.casa.golFatti / element.casa.partiteGiocate * 100)/100 + '\n' +
                    //     'casa.golSubiti / casa.partiteGiocate: ' + Math.round(element.casa.golSubiti / element.casa.partiteGiocate * 100)/100 + '\n' +
                    //     'ospite.golFatti / ospite.partiteGiocate: ' + Math.round(element.ospite.golFatti / element.ospite.partiteGiocate * 100)/100 + '\n' +
                    //     'ospite.golSubiti / ospite.partiteGiocate: ' + Math.round(element.ospite.golSubiti / element.ospite.partiteGiocate * 100)/100 + '\n',
                    //     {
                    //         color: '000000',
                    //         // bold: true,
                    //         font_size: 16
                    //     }
                    // );
                    // pObj.addLineBreak();

                    console.log('golSquadraCasa: ' + element.golSquadraCasa);
                    console.log('golSquadraOspite: ' + element.golSquadraOspite);

                    element.quote.forEach(function(element) {
                        console.log(element.bookmaker + ' - ' + '(1): ' + element.quota1.toFixed(2) + ', ' + '(X): ' + element.quotaX.toFixed(2) + ', ' + '(2): ' + element.quota2.toFixed(2))
                    })

                    console.log('\n')
                }
            })
        } catch (e) {
            console.log(e)
        }

        giornataIndex++;
    }


    // console.log(partiteInSchedina)
    let contaPareggi = 0;
    for(let i = 0; i < partiteInSchedina.length; i++){
        // console.log(partiteInSchedina[i])
        // console.log(partiteInSchedina[i].golSquadraCasa)
        // console.log(partiteInSchedina[i].golSquadraOspite)
        // console.log()
        if(partiteInSchedina[i].golSquadraCasa === partiteInSchedina[i].golSquadraOspite){
            contaPareggi++;
        }
    }
    console.log(contaPareggi)
    console.log(partiteInSchedina.length)
    console.log((contaPareggi * 100 / partiteInSchedina.length).toFixed(2) + '%');



    // let giornataMax = Math.max.apply(Math, partite.map(function(o) {
    //     if(!isNaN(o.giornata)){
    //         return o.giornata;
    //     }
    // }));
    // console.log(giornataMax)
    // let gio = [];
    // for(let i = 1; i <= giornataMax/*1*/; i++){
    //     let oo = partite.filter(function (element) {
    //         // console.log(element)
    //         return element.giornata === i;
    //     });
    //     gio.push(oo);
    // }
    // console.log(gio)
    // console.log(gio[gio.length-1])

    // const checkboxLocator = page.locator("div.event__match.event__match--static.event__match--twoLine");
    // for(const el of await checkboxLocator.elementHandles()) {
    //     // await el.check();
    //     console.log(el);
    // }
    // const results0 = await page.$$eval(`div.event__match.event__match--static.event__match--twoLine`, (allListItems) => {
    //     allListItems.forEach(async singleListItem => await singleListItem.click())
    // });
    // let ccccfgggj = await page.locator("#g_1_fyBAJJos").click();
    // console.log('ccccfgggj');
    // let ccccfgggji = await page.locator("#g_1_fyBAJJos");
    // console.log(await ccccfgggji.innerText());

    // todo: funziona, ma i file occuperebbero molto spazio
    /*// const radios = await page.locator('[type="radio"]');
    // const count = await radios.count();
    // for (let i = 0; i < count; i++) {
    //     await radios.nth(i).click();
    // }
    const arrayOfLocators = page.locator('div.event__match.event__match--static.event__match--twoLine');
    const elementsCount = await arrayOfLocators.count();
    let texts = [];
    for(let index = 0; index < elementsCount; index++) {
        const element = await arrayOfLocators.nth(index);
        const innerText = await element.innerText();
        const attrId = await element.getAttribute('id');
        // texts.push(innerText);
        console.log(innerText)
        console.log(attrId)

        const [newPage1] = await Promise.all([
            context.waitForEvent('page'),
            // This action triggers the new tab
            // pageRim.locator('text=By iVagus Services Pvt. Ltd.').click(),
            // page.click('a[target="_blank"]') // Opens a new tab
            page.waitForSelector(`#${attrId}`),
            // page.locator(`#${attrId}`).click(),
            page.click(`#${attrId}`, {
                // force: true,
                // timeout: 1500
            })
        ]);
        await newPage1.waitForLoadState();

        // let htmlQuote1x2 = await newPage1.content(); //per prendere gli eventi della prima tab

        console.log(await newPage1.url());
        console.log(await newPage1.innerText(`#detail > div.tabs.tabs__detail > div > a:nth-child(2)`));
        if(await newPage1.innerText(`#detail > div.tabs.tabs__detail > div > a:nth-child(2)`) === 'COMP. QUOTE'){
            await newPage1.click(`#detail > div.tabs.tabs__detail > div > a:nth-child(2)`, {
                // force: true,
                timeout: 0
            });
        }

        let htmlQuote1x2 = await newPage1.content();
        console.log(htmlQuote1x2);

        fs.writeFileSync(`./html/quote1x2/${(await newPage1.url()).slice(8).replace(/\//g, "____")}.html`, htmlQuote1x2)
        // fs.writeFileSync(`./html/quote1x2/fvfvffgb.html`, htmlQuote1x2)

        await newPage1.close();
        // console.log(texts)
    }*/


    await browser.close();
})();

