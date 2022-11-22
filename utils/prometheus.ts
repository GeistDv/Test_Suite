import axios from 'axios';
//import {ConfigurationType } from "../types/configurationtype";

class Prometheus {


    public static async PrometheusQueryExecutor(queryString:string): Promise<any> {
        let cont = 0;
        let results: any[] = [];
        const proccess = setInterval(() => {
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
                    console.log("llego a 2")
                    testResults(results);
                    clearInterval(proccess);
                 }
                //proccesJson(response.data);
                //console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
                reject(false)
                console.log(error);
            });
        } /*here*/);
     }, 5 * 1000);
    }
}

function testResults(json: any){
    let result = JSON.parse(JSON.stringify(json));
    let cpuValidators: any[] = [];
    let cpuApi: any[] = [];
    let cpuRoot: any[] = [];
    let i = 0;
    let j = 0;
    for(let res of result){
        console.log(res.data.result[i].value[1]);
        //let jsonResult = JSON.parse(JSON.stringify(res.data.result[j]));
        for(let resu of res.data.result){
            console.log(resu.metric.pod);
            let resultValue = resu.value[1];
            if(resu.metric.pod.includes("api")){
                cpuApi.push(resultValue);
            }
            else if(resu.metric.pod.includes("validator")){
                console.log(resultValue);
                cpuValidators.push(resultValue);
            }
            else{
                cpuRoot.push(resultValue)
            }
            j++;       
            // console.log("timestamp: " + result.value[0])
            // console.log(new Date(result.value[0] * 1000).toUTCString())
            }
        i++;
    }
    let cpuTotalValidators = sumMetricValues(cpuValidators)
    let cpuTotalApi = sumMetricValues(cpuApi)
    let cpuTotalRoot = sumMetricValues(cpuRoot)
    console.log(cpuTotalValidators);
    console.log(cpuTotalApi);
    console.log(cpuTotalRoot);
    console.log(getMaxMetricValue(cpuValidators))
}

// function proccesJson(json: any){

//     interface MyObj {
//         status: string;
//         data: object;
//     }
//     //TODO: Implement logic for get and register metrics

//     let jsonResult = JSON.parse(JSON.stringify(json.data.result))
//     let cpuValidators: any[] = [];
//     let cpuApi: any[] = [];
//     let cpuRoot: any[] = [];
//     for(let result of jsonResult){
//         console.log(result.metric.pod);
//         let resultValue = result.value[1];
//         if(result.metric.pod.includes("api")){
//             cpuApi.push(resultValue);
//         }
//         else if(result.metric.pod.includes("validator")){
//             console.log(resultValue);
//             cpuValidators.push(resultValue);
//         }
//         else{
//             cpuRoot.push(resultValue)
//         }       
//         // console.log("timestamp: " + result.value[0])
//         // console.log(new Date(result.value[0] * 1000).toUTCString())
//     }
//     let cpuTotalValidators = sumMetricValues(cpuValidators)
//     let cpuTotalApi = sumMetricValues(cpuApi)
//     let cpuTotalRoot = sumMetricValues(cpuRoot)
//     console.log(cpuTotalValidators);
//     console.log(cpuTotalApi);
//     console.log(cpuTotalRoot);
//     console.log(getMaxMetricValue(cpuValidators))

// }

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

