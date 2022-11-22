import axios from 'axios';
import dotenv from 'dotenv';
//import {ConfigurationType } from "../types/configurationtype";

class Prometheus {

    public static async PrometheusQueryExecutor(queryString:string): Promise<any> {
        let cont = 0;
        let results: any[] = [];
        let intervalSecconds = 15;
        const interval = setInterval(() => {
        console.log("Making Prometheus request");
        return new Promise(async (resolve, reject) => {
            var request = {
                method: 'post',
                url: 'https://prometheus.camino.network/api/v1/query?query=' + queryString
            };

            axios(request)
            .then(function (response) {
                results.push(response.data);
                cont = cont+1;
                if(cont == 5){
                    processJson(results);
                    clearInterval(interval);
                 }
            })
            .catch(function (error) {
                console.log(error);
                reject(false)
                console.log(error);
            });
        });
      }, intervalSecconds * 1000);
    }
}

function processJson(json: any){
    let result = JSON.parse(JSON.stringify(json));
    let cpuValidators: any[] = [];
    let cpuApi: any[] = [];
    let cpuRoot: any[] = [];
    for(let res of result){
        for(let resu of res.data.result){
            let resultValue = resu.value[1];
            if(resu.metric.pod.includes("api")){
                cpuApi.push(resultValue);
            }
            else if(resu.metric.pod.includes("validator")){
                cpuValidators.push(resultValue);
            }
            else{
                cpuRoot.push(resultValue)
            }    
        }
    }
    let cpuTotalValidators = sumMetricValues(cpuValidators);
    let cpuTotalApi = sumMetricValues(cpuApi);
    let cpuTotalRoot = sumMetricValues(cpuRoot);
    let maxCpuValidators = getMaxMetricValue(cpuValidators);
    let maxApiValidators = getMaxMetricValue(cpuApi);
    let maxRootValidators = getMaxMetricValue(cpuRoot);
    console.log("Total CPU Validators: " + cpuTotalValidators);
    console.log("Total CPU Api: " + cpuTotalApi);
    console.log("Total CPU Root: " + cpuTotalRoot);
    console.log("Max CPU Validators: " + maxCpuValidators);
    console.log("Max CPU Api: " + maxApiValidators);
    console.log("Max CPU Root: " + maxRootValidators);
}

function sumMetricValues(values: string[]){
    let total = 0; 
    for(let res of values){
        total += parseFloat(res);
    }
    return total;
}

function getMaxMetricValue(values: number[]){
    return Math.max.apply(null, values);
}

export default Prometheus;