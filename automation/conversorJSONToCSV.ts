import fs from 'fs';
//import moment from 'moment';

export async function convertDataTestAutomationToCSV(data: any) {

    let stringCSV = "";

    stringCSV = stringCSV + data.meanResTime + ",";
    stringCSV = stringCSV + data.maxResTime + ",";
    stringCSV = stringCSV + data.avgBlockTime + ",";
    stringCSV = stringCSV + data.maxBlockTime + ",";
    stringCSV = stringCSV + data.minBlockTime + ",";
    stringCSV = stringCSV + data.throughput + ",";
    stringCSV = stringCSV + data.maxTPS + ",";
    stringCSV = stringCSV + data.validatorsMemory + ",";
    stringCSV = stringCSV + data.validatorsCPU + ",";
    stringCSV = stringCSV + data.rootMemory + ",";
    stringCSV = stringCSV + data.rootCPU + ",";
    stringCSV = stringCSV + data.apiMemory + ",";
    stringCSV = stringCSV + data.apiCPU + ",";
    stringCSV = stringCSV + data.timeProcess + ",";
    stringCSV = stringCSV + data.errorPct + ",";
    
    //let today = moment().format("MM-DD-YYYY-HH:mm:ss");
    //let routeFile = `./automation/tests/test${today}.csv`;

    //var stringToWrite: string = (fs.existsSync(routeFile) ? '\n' : '') + stringCSV;
    //fs.appendFileSync(routeFile, stringToWrite);
}