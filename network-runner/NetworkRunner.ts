
import * as child from 'child_process';
import { ConfigurationType } from "../types/configurationtype";
import { promiseExitAndError, promiseFromChildProcess } from './VerifierPromisesChildProcess';
import fs from 'fs';
import path from 'path';

const dirPath = path.join(__dirname + "/PPID.txt");

class NetworkRunner {

    configuration: ConfigurationType = {
        enable_gdocs_insertion: false,
        enable_measurements: false,
        private_key_with_funds: "PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN",
        rpc: "",
        rpc_keystore: "",
        test_type: "transfer",
        sheet_name: "",
    };

    validatorNodes: number = 0;

    ppidGnomeProcess : any = null;

    constructor(config: ConfigurationType, validatorNodes: number) {

        //Configuration Type
        this.configuration.enable_gdocs_insertion = config.enable_gdocs_insertion != undefined ? config.enable_gdocs_insertion : false;
        this.configuration.test_type = config.test_type;
        this.configuration.sheet_name = config.sheet_name != undefined ? config.sheet_name : "";

        //Test Case
        this.validatorNodes = validatorNodes;
    }

    public async runNetworkRunner() {
        return new Promise((resolve, reject) => {
            this.deletePPIDFile();
            child.exec('gnome-terminal -- bash -c "sh ./network-runner/CaminoRunner.sh; bash"');
            console.log("Create Network, wait a seconds...");
            setTimeout(() => {
                this.getPPIDProcessGnomeTerminal().then((ppid) => {
                    this.ppidGnomeProcess = ppid;
                    console.log("PPID Data", ppid);
                    this.getPPIDProcessGnomeTerminal();
                    let cantNodes = this.validatorNodes;
                    console.log("Count Nodes ->", cantNodes);

                    let processRunnerCurlRunner: any = child.exec(`sh ./network-runner/CurlCaminoRunner.sh ${cantNodes}`);
                    promiseExitAndError(processRunnerCurlRunner).then((data) => {
                        this.verifyNodes(cantNodes).then((data) => {
                            resolve(data);
                        });
                    });
                });
            }, 2000);
        });
    }

    private async verifyNodes(cantNodes: number) {
        let nodesActive = 0;
        let nodesData = [];
        while (nodesActive <= 0) {
            let nodes: any = await this.shellNodes(cantNodes);
            nodesActive = nodes.uris.length;
            nodesData = nodes.uris;
        }
        return nodesData;
    }

    private async shellNodes(cantNodes: number) {
        return new Promise((resolve, reject) => {
            let processVerifyNodes: any = child.exec("curl -X POST -k http://localhost:8081/v1/control/uris -d ''");
            promiseFromChildProcess(processVerifyNodes).then((data: any) => {
                resolve(JSON.parse(data));
            });
        });
    }

    private async getPPIDProcessGnomeTerminal() {
        return new Promise ((resolve, reject) => {
           
            fs.readFile(dirPath, 'utf8', function (err, data) {
                if (err) throw err;
                let stringData = data.toString();
                var rx = /\d*/g;
                var arr: any = rx.exec(stringData);
                resolve(arr[0]);
            });
        })
    }

    public async killGnomeTerminal () 
    {
        child.exec(`kill -9 ${this.ppidGnomeProcess}`);
        this.deletePPIDFile();
    }

    private async deletePPIDFile () 
    {
        if(fs.existsSync(dirPath))
        {
            fs.unlinkSync(dirPath);
        }
    }

}

export default NetworkRunner;

