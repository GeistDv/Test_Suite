
import * as child from 'child_process';

class KubectlChecker {

    commandKubcetl: string = "";
    dataPods: any[] = [];
    confirmedStadisticPodsCPU: number = 0;
    confirmedStadisticPodsMemory: number = 0;
    totalCPUPods: number = 0;
    totalMemoryPods: number = 0;
    maxCPUPods: number = 0;
    maxMemoryPods: number = 0;

    constructor(commandKubectl: string) {
        this.commandKubcetl = commandKubectl;
    }

    public async execCommand() {
        var processKubectl = child.exec(this.commandKubcetl);
        this.promiseFromChildProcess(processKubectl).then((response: any) => {
            this.dataPods.push(response);
            this.performSumCPUAndMemory();
        }).catch((err) => {
            console.log("Error in Checker PODS", err);
        });
    }
    public async execCommandWithoutMetrics(){
        var processKubectl = child.exec(this.commandKubcetl);
        let tempArray : any[];
        try{
            tempArray = Array(await this.promiseFromChildProcess(processKubectl))
            this.dataPods = tempArray[0].slice(0)
        }
        catch (e) {
            console.log("Error in Checker PODS", e);
        }
    }

    private async promiseFromChildProcess(child: any) {
        let outputsData: any[] = [];
        return new Promise(function (resolve, reject) {
            child.stdout.on("data", (data: any) => {
                outputsData.push(data);
            });

            child.stdout.on("close", (data: any) => {
                resolve(outputsData);
            });

            child.addListener("error", reject);
        });
    }

    private performSumCPUAndMemory() {
        var rxCPU = /\d*m/g;
        var rxMemory = /\d*Mi/g;

        //First get data of pods using regex
        for (let i = 0; i < this.dataPods.length; i++) {

            let stringCommand = this.dataPods[i][0];
            let stringCommandSplitted = stringCommand.split("\n");

            for (let j = 0; j < stringCommandSplitted.length; j++) {

                if (stringCommandSplitted[j] != '') {
                    let arrCPU: any = rxCPU.exec(stringCommandSplitted[j]);
                    let arrMemory: any = rxMemory.exec(stringCommandSplitted[j]);

                    if (arrCPU != null && arrCPU != undefined) {

                        let numberDataCPU = arrCPU[0].split("m");
                        if (numberDataCPU[0] != '') {

                            if(parseFloat(numberDataCPU[0]) > this.maxCPUPods)
                            {
                                this.maxCPUPods = parseFloat(numberDataCPU[0]);
                            }

                            this.totalCPUPods = this.totalCPUPods + parseFloat(numberDataCPU[0]);
                            this.confirmedStadisticPodsCPU = this.confirmedStadisticPodsCPU + 1;
                        }
                    }

                    if (arrMemory != null && arrMemory != undefined) {
                        let numberDataMemory = arrMemory[0].split("Mi");
                        if (numberDataMemory[0] != '') {

                            if(parseFloat(numberDataMemory[0]) > this.maxMemoryPods)
                            {
                                this.maxMemoryPods = parseFloat(numberDataMemory[0]);
                            }

                            this.totalMemoryPods = this.totalMemoryPods + parseFloat(numberDataMemory[0]);
                            this.confirmedStadisticPodsMemory = this.confirmedStadisticPodsMemory + 1;
                        }
                    }
                }
            }
        }
    }

    calculateAverageCPU() {
        let averageCPU = this.totalCPUPods / this.confirmedStadisticPodsCPU;
        return averageCPU;
    }

    calculateAverageMemory() {
        let averageMemory = this.totalMemoryPods / this.confirmedStadisticPodsMemory;
        return averageMemory;
    }

    restarMaxCPUAndMaxMemory () {
        this.maxCPUPods = 0;
        this.maxMemoryPods = 0;
        this.totalCPUPods = 0;
        this.totalMemoryPods = 0;
    }

}

export default KubectlChecker;

