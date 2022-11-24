import IMetricsProvider from "../interfaces/IMetricsProvider";
import {Constants} from "../constants";
import axios from "axios";

class PrometeusProvider implements IMetricsProvider {

    data : any = {};
    private memoryData : string[] = [];
    private cpuData : string[] = [];

    private activeTest = false;

    constructor() {}

    public async StartMeasurements(): Promise < boolean > {

        this.activeTest = true;
        while (this.activeTest) {
            this.memoryData.push(await this.executeRequestPrometeus(Constants.PROMETEUS_CPU_QUERY));
            this.cpuData.push(await this.executeRequestPrometeus(Constants.PROMETEUS_MEMORY_QUERY));
            console.log("querying data PMT...." + this.memoryData.length);
            //wait for 15 seconds
            await new Promise(resolve => setTimeout(resolve, 15000));
        }

        return true;
    }

    public FinishMeasurements(): Promise < boolean > {

        console.log("Finishing Measurements");
        this.activeTest = false;

        return new Promise(
            (resolve, reject) => {
                resolve(true);
            }
        );
    }

    public GetMetrics(): Promise < any > {

        return new Promise(
            (resolve, reject) => {
                var resultsCPU = this.summaryzeData(this.cpuData);
                var resultsMemory = this.summaryzeData(this.memoryData);

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
                        dataTotalValidators: this.convertBytesToMebibytes(resultsMemory.dataTotalValidators),
                        dataTotalApi: this.convertBytesToMebibytes(resultsMemory.dataTotalApi),
                        dataTotalRoot: this.convertBytesToMebibytes(resultsMemory.dataTotalRoot),
                        maxDataApi: this.convertBytesToMebibytes(resultsMemory.maxDataApi),
                        maxDataValidators: this.convertBytesToMebibytes(resultsMemory.maxDataValidators),
                        maxDataRoot: this.convertBytesToMebibytes(resultsMemory.maxDataRoot)
                    }
                }

                resolve(metricsResult);
            }
        );
    }

    private async executeRequestPrometeus(querystring : string): Promise < string > {

        return new Promise(async (resolve, reject) => {
            var request = {
                method: 'post',
                url: Constants.PROMETEUS_ENDPOINT + querystring
            };

            axios(request).then(function (response) {
                resolve(response.data);
            }).catch(function (error) {
                console.log(error);
                reject(false)
            });
        });
    }

    private convertBytesToMebibytes(bytes : number) {
        return bytes / 1048576;
    }

    private getAverage(values : string[]) {
        let total = 0;
        for (let res of values) {
            total += parseFloat(res);
        }
        return total / values.length;
    }

    private getMaxMetricValue(values : number[]) {
        return Math.max.apply(null, values);
    }

    private summaryzeData(result : any[]) {
        {
            let dataValidators: any[] = [];
            let dataApi: any[] = [];
            let dataRoot: any[] = [];

            for (let res of result) {
                for (let resu of res.data.result) {
                    let resultValue = resu.value[1];
                    if (resu.metric.pod.includes("api")) {
                        dataApi.push(resultValue);
                    } else if (resu.metric.pod.includes("validator")) {
                        dataValidators.push(resultValue);
                    } else {
                        dataRoot.push(resultValue)
                    }
                }
            }

            let dataTotalValidators = this.getAverage(dataValidators);
            let dataTotalApi = this.getAverage(dataApi);
            let dataTotalRoot = this.getAverage(dataRoot);
            let maxDataValidators = this.getMaxMetricValue(dataValidators);
            let maxDataApi = this.getMaxMetricValue(dataApi);
            let maxDataRoot = this.getMaxMetricValue(dataRoot);

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

    }
}

//export
export default PrometeusProvider;
