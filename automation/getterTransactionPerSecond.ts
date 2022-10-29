import fs from "fs";

export async function getTransactionsPerSecond(infoTest: any) {
    let transactionPerSecondString = getStringWithFileJS(infoTest);
    let jsonWithRegex = getTransactionsPerSecondWithRegex(transactionPerSecondString);
    
    if(jsonWithRegex != null && jsonWithRegex != undefined)
    {
        let jsonTPS = jsonWithRegex.result;
        return jsonTPS;
    }
    else
    {
        let dataSplittedNewSTR = extractDataWithSplit(transactionPerSecondString);
        if(dataSplittedNewSTR != null && dataSplittedNewSTR != undefined)
        {
            let jsonTPS = JSON.parse(dataSplittedNewSTR).result;
            return jsonTPS;
        }
        else
        {
            return null;
        }
    }
}

function getStringWithFileJS(infoTest: any) {
    const path = require('path');
    const dirPath = path.join(__dirname, `/../${infoTest.dirname}/content/js/graph.js`);
    let transactionPerSecond = fs.readFileSync(dirPath);
    let transactionPerSecondString = transactionPerSecond.toString('utf8');
    return transactionPerSecondString;
}

function extractDataWithSplit(stringCompare: string) {
    try
    {
        let stringSplitted = stringCompare.split("var transactionsPerSecondInfos = ");
        let dataSplitted = stringSplitted[1].split("getOptions: function(){");
        let dataSplittedNewSTR = dataSplitted[0].replace("data: ", "");
        dataSplittedNewSTR = dataSplittedNewSTR.replace('"Transactions Per Second"}},', '"Transactions Per Second"}}');
        dataSplittedNewSTR = dataSplittedNewSTR.replace('{"result":', '"result":');
        return dataSplittedNewSTR;
    }
    catch(e)
    {
        console.log(e);
        return null;
    }
}

function getTransactionsPerSecondWithRegex(stringCompare: string) {
    try {
        var rx = /{.*"Transactions Per Second"}}/g;
        var arr: any = rx.exec(stringCompare);
        return JSON.parse(arr[0]);
    }
    catch (e) {
        console.log("REGEX ERROR:", e);
        return null;
    }
}