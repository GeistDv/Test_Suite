import * as child from 'child_process';
import path, { resolve } from 'path';
import Prometheus from '../utils/prometheus';
import fs from 'fs';
import { findConfigFile } from 'typescript';

let cpuPrometheus: any = undefined;
let memoryPrometheus: any = undefined;
let numberCase: number = 0;

export function execPrometheus(numberCaseData: number) {
    try {
        numberCase = numberCaseData;
        cpuPrometheus = child.fork(path.join(__dirname + `/../metrics/cpuMetrics.ts`), {
            env: {
                caseTest: numberCase.toString()
            }
        });
        memoryPrometheus = child.fork(path.join(__dirname + `/../metrics/memoryMetrics.ts`), {
            env: {
                caseTest: numberCase.toString()
            }
        });
        return true;
    }
    catch (e) {
        return false;
    }
}
export function convertBytesToMebibytes(bytes: number) {
    return bytes / 1048576;
}

export async function disconnectPrometheusProcess(numberCase:number) : Promise<boolean> {
    return new Promise((resolve, reject) => {
        try
        {
            cpuPrometheus.disconnect();
            memoryPrometheus.disconnect();
    
            var existFolder:boolean = false;
            while (!existFolder){
                if(fs.existsSync(path.join(__dirname + `/../temp/cpuMetrics${numberCase}.json`)) && fs.existsSync(path.join(__dirname + `/../temp/memoryMetrics${numberCase}.json`))){
                    existFolder=true;
                }
            }
            resolve(true);
        }
        catch(e)
        {
            resolve(false);
        }
    });
}
//path.join(__dirname + `/../temp/cpuMetrics${numberCase}.json`)
//path.join(__dirname + `/../temp/memoryMetrics${numberCase}.json`)

export async function calculateMetrics() {
    return new Promise((resolve, reject) => {
    const dataCPU = require(path.join(__dirname + `/../temp/cpuMetrics${numberCase}.json`));
    let resultsCPU = Prometheus.processJson(dataCPU);

    const dataMemory = require(path.join(__dirname + `/../temp/memoryMetrics${numberCase}.json`));
    let resultsMemory = Prometheus.processJson(dataMemory);


    let metricsResult = {
        cpu: {
            dataTotalValidators: resultsCPU.dataTotalValidators,
            dataTotalApi: resultsCPU.dataTotalApi,
            dataTotalRoot: resultsCPU.dataTotalRoot,
            maxDataApi: resultsCPU.maxDataApi,
            maxDataValidators: resultsCPU.maxDataValidators,
            maxDataRoot: resultsCPU.maxDataRoot
        },
        memory: {
            dataTotalValidators: convertBytesToMebibytes(resultsMemory.dataTotalValidators),
            dataTotalApi: convertBytesToMebibytes(resultsMemory.dataTotalApi),
            dataTotalRoot: convertBytesToMebibytes(resultsMemory.dataTotalRoot),
            maxDataApi: convertBytesToMebibytes(resultsMemory.maxDataApi),
            maxDataValidators: convertBytesToMebibytes(resultsMemory.maxDataValidators),
            maxDataRoot: convertBytesToMebibytes(resultsMemory.maxDataRoot)
    }}
    resolve(metricsResult)
    })
    
}

export function deleteJSONMetrics() {
    try {
        fs.unlinkSync(path.join(__dirname + `/../temp/cpuMetrics${numberCase}.json`));
        fs.unlinkSync(path.join(__dirname + `/../temp/memoryMetrics${numberCase}.json`));

        cpuPrometheus.kill();
        memoryPrometheus.kill();

        cpuPrometheus = undefined;
        memoryPrometheus = undefined;

        return true;
    }
    catch (e) {
        return false;
    }
}