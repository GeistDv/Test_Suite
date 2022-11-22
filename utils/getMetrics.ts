import * as child from 'child_process';
import path from 'path';
import Prometheus from './prometheus';

let cpuPrometheus : any = undefined;
let memoryPrometheus : any = undefined;

export function execPrometheus()
{
    try
    {
        cpuPrometheus = child.fork(path.join(__dirname + `/../metrics/cpuMetrics.ts`));
        memoryPrometheus = child.fork(path.join(__dirname + `/../metrics/memoryMetrics.ts`));
        return true;
    }
    catch(e)
    {
        return false;
    }
}

export function killPrometheus()
{
    try
    {
        cpuPrometheus.disconnect();
        memoryPrometheus.disconnect();
        return true;
    }
    catch(e)
    {
        return false;
    }
}

export function calculateMetrics () 
{
    const dataCPU = require(path.join(__dirname + `/../temp/cpuMetrics.json`));
    let resultsCPU = Prometheus.processJson(dataCPU);

    const dataMemory = require(path.join(__dirname + `/../temp/memoryMetrics.json`));
    let resultsMemory = Prometheus.processJson(dataMemory);


    let finalData = {
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
    return finalData;
}