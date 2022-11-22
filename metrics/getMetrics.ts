import * as child from 'child_process';
import path from 'path';
import Prometheus from '../utils/prometheus';
import fs from 'fs';

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

export function disconnectPrometheusProcess() {
    try {

        cpuPrometheus.disconnect();
        memoryPrometheus.disconnect();
        return true;
    }
    catch (e) {
        return false;
    }
}

export function calculateMetrics() {
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
            dataTotalValidators: resultsMemory.dataTotalValidators,
            dataTotalApi: resultsMemory.dataTotalApi,
            dataTotalRoot: resultsMemory.dataTotalRoot,
            maxDataApi: resultsMemory.maxDataApi,
            maxDataValidators: resultsMemory.maxDataValidators,
            maxDataRoot: resultsMemory.maxDataRoot
        },
    }
    return metricsResult;
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