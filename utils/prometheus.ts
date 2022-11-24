import axios from 'axios';
import dotenv from 'dotenv';
//import {ConfigurationType } from "../types/configurationtype";

class Prometheus {

    public static async PrometheusQueryExecutor(queryString: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            var request = {
                method: 'post',
                url: 'https://prometheus.camino.network/api/v1/query?query=' + queryString
            };

            axios(request).then(function (response) {
                resolve(response.data);
            }).catch(function (error) {
                console.log(error);
                reject(false)
            });
        });
    }

    public static processJson(json: any)
    {
        let result = JSON.parse(JSON.stringify(json));
        let dataValidators: any[] = [];
        let dataApi: any[] = [];
        let dataRoot: any[] = [];

        for (let res of result) {
            for (let resu of res.data.result) {
                let resultValue = resu.value[1];
                if (resu.metric.pod.includes("api")) {
                    dataApi.push(resultValue);
                }
                else if (resu.metric.pod.includes("validator")) {
                    dataValidators.push(resultValue);
                }
                else {
                    dataRoot.push(resultValue)
                }
            }
        }
        
        let dataTotalValidators = Prometheus.avgMetricValues(dataValidators);
        let dataTotalApi = Prometheus.avgMetricValues(dataApi);
        let dataTotalRoot = Prometheus.avgMetricValues(dataRoot);
        let maxDataValidators = Prometheus.getMaxMetricValue(dataValidators);
        let maxDataApi = Prometheus.getMaxMetricValue(dataApi);
        let maxDataRoot = Prometheus.getMaxMetricValue(dataRoot);

        console.log("Total Data Validators: " + dataTotalValidators);
        console.log("Total Data Api: " + dataTotalApi);
        console.log("Total Data Root: " + dataTotalRoot);
        console.log("Max Data Validators: " + maxDataValidators);
        console.log("Max Data Api: " + maxDataApi);
        console.log("Max Data Root: " + maxDataRoot);
    
        let resultsData = {
            dataTotalValidators: dataTotalValidators,
            dataTotalApi: dataTotalApi,
            dataTotalRoot: dataTotalRoot,
            maxDataApi: maxDataApi,
            maxDataValidators: maxDataValidators,
            maxDataRoot: maxDataRoot
        }
    
        return resultsData;
    }

    public static avgMetricValues(values: string[])
    {
        let total = 0;
        for (let res of values) {
            total += parseFloat(res);
        }
        return total / values.length;
    }

    public static getMaxMetricValue(values: number[]) {
        return Math.max.apply(null, values);
    }

}

export default Prometheus;