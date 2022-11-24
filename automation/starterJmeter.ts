import * as child from 'child_process';
import { getTransactionsPerSecond } from './getterTransactionPerSecond';
import axios from 'axios';
import { startTimerVerifyKubectl, finishTimerKubcetl, restarMaxCPUAndMaxMemory, initKubectlChecker } from './getterCPUAndMemory';
import Web3 from 'web3';
import Utils from '../utils/utils';
import NetworkRunner from '../network-runner/NetworkRunner';
import TestCase from '../types/testcase';
import { ConfigurationType } from '../types/configurationtype';
import dotenv from 'dotenv';
import DataTests from '../DataTest';

import { execPrometheus, getMetrics, finishProcessPrometheus } from '../metrics/getMetrics';

dotenv.config();

const express = require('express');
const app = express();
const { google } = require('googleapis');
app.use(express.urlencoded({ extended: true }));

let blockNumberReference: number;


export async function startTestsAndGatherMetrics(testCase: TestCase, configurationType: ConfigurationType, numberCase: number) {

    try {

        var web3 = new Web3(configurationType.rpc_keystore + '/ext/bc/C/rpc');
        let referenceBlock: number = await web3.eth.getBlockNumber();
        blockNumberReference = referenceBlock + 1;

        console.log("Block Number Reference :", blockNumberReference);

        // Start Test JMeter
        /*
        if (configurationType.enable_measurements) {
            initKubectlChecker(networkName);
            startTimerVerifyKubectl();
        }*/
        let metrics: any = undefined;
        let killedPrometheus = undefined;

        if (configurationType.enable_measurements) {
            execPrometheus(numberCase);
        }

        let infoTest: any = await startJmeterWithShell(testCase);

        if(configurationType.enable_measurements)
        {
            metrics = await getMetrics();
        }

        //let dataKubectl = finishTimerKubcetl(configurationType);
        console.log("Info Test:", infoTest);

        let jsonStadistic = require(`../${infoTest.dirname
            }/statistics.json`);
        let blockDataDetails = await Utils.getBlockDetails(web3, blockNumberReference);
        let transactionPerSecond: any = await getTransactionsPerSecond(infoTest);
        // let spreadsheetId = '1bxCCl9PZqTqDXjIauamecW7rYiqbeAu43cxTuB1QU6g';
        let data = {
            meanResTime: jsonStadistic.Total.meanResTime, // Average Transaction Time (ms)
            maxResTime: jsonStadistic.Total.maxResTime, // Max Transaction Time (ms)
            avgBlockTime: blockDataDetails.averageTimeBetweenBlocks, // AVG Block Time
            maxBlockTime: blockDataDetails.maxBlockTime, // Max Block Time
            minBlockTime: blockDataDetails.minBlockTime, // Min Block Time
            throughput: jsonStadistic.Total.throughput.toFixed(2), // AVG TPS
            maxTPS: transactionPerSecond != null ? transactionPerSecond.maxY : null, // Max TPS
            errorPct: jsonStadistic.Total.errorPct, // % Error
            timeProcess: infoTest.miliseconds, // Total Time To Process,
            apiCPU: metrics != undefined ? metrics.cpu.dataTotalApi : "",
            apiMemory: metrics != undefined ? metrics.memory.dataTotalApi : "",
            rootCPU: metrics != undefined ? metrics.cpu.dataTotalRoot : "",
            rootMemory: metrics != undefined ? metrics.memory.dataTotalRoot : "",
            validatorsCPU: metrics != undefined ? metrics.cpu.dataTotalValidators : "",
            validatorsMemory: metrics != undefined ? metrics.memory.dataTotalValidators : "",
            maxMemoryAPI: metrics != undefined ? metrics.memory.maxDataApi : "",
            maxMemoryRoot: metrics != undefined ? metrics.memory.maxDataRoot : "",
            maxMemoryValidators: metrics != undefined ? metrics.memory.maxDataValidators : "",
            maxCPUAPI: metrics != undefined ? metrics.cpu.maxDataApi : "",
            maxCPURoot: metrics != undefined ? metrics.cpu.maxDataRoot : "",
            maxCPUValidators: metrics != undefined ? metrics.cpu.maxDataValidators : "",
        }

        console.log(data);
        if (configurationType.enable_gdocs_insertion) {
            await DataTests.writeDataInGdocs(data, testCase.Position, configurationType.sheet_name);
        }

        // Force Clean Kubectl
        /*
        if (configurationType.enable_measurements) {
            restarMaxCPUAndMaxMemory();
        }
        */

        if(configurationType.enable_measurements)
        {
            finishProcessPrometheus();
        }

    } catch (e) {
        console.log("Test JMeter Failed:", e);
    }
}

// async function writeDataInGdocs(data: any, position: number) {
//     //TODO: Change hardcoded values to a configuration file
//     const auth = new google.auth.GoogleAuth({
//         keyFile: process.env.GDOCS_KEY_FILE,
//         scopes: 'https://www.googleapis.com/auth/spreadsheets',
//     });
//     const sheet = google.sheets("v4")
//     await sheet.spreadsheets.values.append({
//       spreadsheetId: process.env.GDOCS_SPREADSHEET_ID,
//       auth: auth,
//       range: `Hoja6!I${position}:Y${position}`,
//       valueInputOption: "RAW",
//       requestBody: {
//         values: [
//             [
//                 data.meanResTime,
//                 data.maxResTime,
//                 data.avgBlockTime,
//                 data.maxBlockTime,
//                 data.minBlockTime,
//                 data.throughput,
//                 data.maxTPS,
//                 data.validatorsMemory,
//                 data.validatorsCPU,
//                 data.rootMemory,
//                 data.rootCPU,
//                 data.apiMemory,
//                 data.apiCPU,
//                 data.timeProcess,
//                 data.errorPct
//         ]
//     ]
//       }
//     }).then((res: any) => {
//         console.log(res.data)
//         })
//     .catch((err: any) => {
//         console.log(err)
//     })
// }

export async function startJmeterWithShell(testcase: TestCase) {
    return new Promise((resolve, reject) => {

        var threads = translateNumberIntoArrayOfunitsOf1000(testcase.Threads);
        var command = `sh run.sh ${threads[0]
            } ${threads[1]
            } ${threads[2]
            } ${threads[3]
            }`;

        let timeDataStarter = Date.now();
        var processTest = child.exec(command);

        promiseFromChildProcess(processTest).then((response: any) => {

            let totalTime = Date.now() - timeDataStarter;
            let seconds = Math.round(totalTime / 1000);
            let dirname = response[response.length - 1].split("\n");
            resolve({ seconds: seconds, dirname: dirname[1], miliseconds: totalTime });
        }).catch((err) => {
            reject(err);
        });
    });
}

async function promiseFromChildProcess(child: any) {

    let outputsData: any[] = [];

    return new Promise(function (resolve, reject) { // Find ultimate folder or change regular expression with the ip
        child.stdout.on("data", (data: any) => {
            console.log("ON DATA:", data);
            outputsData.push(data);
        });

        child.stdout.on("close", (data: any) => {
            resolve(outputsData);
        });

        child.addListener("error", reject);
        // child.addListener("exit", resolve);
    });
}

function translateNumberIntoArrayOfunitsOf1000(number: number): number[] {
    let numberToTranslate = number;
    let unitsOf1000: any[] = [];

    while (numberToTranslate > 0) {
        if (numberToTranslate > 1000) {
            unitsOf1000.push(1000);
            numberToTranslate = numberToTranslate - 1000;
        } else {
            unitsOf1000.push(numberToTranslate);
            numberToTranslate = 0;
        }
    }
    return unitsOf1000;
}
