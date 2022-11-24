import * as child from 'child_process';
import path, { resolve } from 'path';
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
export function convertBytesToMebibytes(bytes: number) {
    return bytes / 1048576;
}

export async function getMetrics() {
    try {
        //cpuPrometheus.disconnect();
        //memoryPrometheus.disconnect();

        let dataCPU : any = await getMetricsCPU();
        let dataMemory : any = await getMetricsMemory();

        dataCPU = Prometheus.processJson(dataCPU);
        dataMemory = Prometheus.processJson(dataMemory);

        console.log("dataCPU", dataCPU);
        console.log("dataMemory", dataMemory);

        let metricsResult = {
            cpu: {
                dataTotalValidators: dataCPU.dataTotalValidators,
                dataTotalApi: dataCPU.dataTotalApi,
                dataTotalRoot: dataCPU.dataTotalRoot,
                maxDataApi: dataCPU.maxDataApi,
                maxDataValidators: dataCPU.maxDataValidators,
                maxDataRoot: dataCPU.maxDataRoot
            },
            memory: {
                dataTotalValidators: convertBytesToMebibytes(dataMemory.dataTotalValidators),
                dataTotalApi: convertBytesToMebibytes(dataMemory.dataTotalApi),
                dataTotalRoot: convertBytesToMebibytes(dataMemory.dataTotalRoot),
                maxDataApi: convertBytesToMebibytes(dataMemory.maxDataApi),
                maxDataValidators: convertBytesToMebibytes(dataMemory.maxDataValidators),
                maxDataRoot: convertBytesToMebibytes(dataMemory.maxDataRoot)
            },
        }
        return metricsResult;
    }
    catch (e) {
        return null;
    }
}

async function getMetricsCPU() {
    return new Promise((resolve, reject) => {
        cpuPrometheus.send({ readData: true });
        cpuPrometheus.on("message", (msg: any) => {
            resolve(msg.data);
        });
    })
}

async function getMetricsMemory() {
    return new Promise((resolve, reject) => {
        memoryPrometheus.send({ readData: true });
        memoryPrometheus.on("message", (msg: any) => {
            resolve(msg.data);
        });
    })
}

export function finishProcessPrometheus()
{
    cpuPrometheus.disconnect();
    memoryPrometheus.disconnect();
    cpuPrometheus.kill();
    memoryPrometheus.kill();
}