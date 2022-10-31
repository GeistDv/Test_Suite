import Web3 from "web3";
//import config from "../config.json";
import fs, { constants, promises } from "fs";
import {BinTools, Buffer} from "avalanche";
import axios from "axios";
import { ConfigurationType }  from "../types/configurationtype";
import DataFlow from "../types/dataflowtype";
import { logger } from "./logger";
import { Constants } from "../constants";
import NetworkRunner from "../network-runner/NetworkRunner";
import KubectlChecker from '../automation/KubectlChecker';
import TestCase from "../types/testcase";

class utilsX {

    Configuration : ConfigurationType;
    dataFlow : DataFlow;
    web3 : Web3;
    constructor(configTypeForCompleteTest : ConfigurationType, dataFlow : DataFlow) {

        this.Configuration = configTypeForCompleteTest;
        this.web3 = new Web3(this.Configuration.rpc + '/ext/bc/C/rpc');;
        this.dataFlow = dataFlow;
    }
    
    
    public static async createUserAccount(config: ConfigurationType) : Promise <boolean> {
        
        console.log("Creating user account...");
        return new Promise(async (resolve, reject) => {
            var data = JSON.stringify(
                {
                    "jsonrpc": "2.0",
                    "id": 1,
                    "method": "keystore.createUser",
                    "params": {
                        "username": Constants.KEYSTORE_USER,
                        "password": Constants.KEYSTORE_PASSWORD
                    }
                }
            );
    
            var request = {
                method: 'post',
                url: config.rpc_keystore + '/ext/keystore',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
    
            axios(request)
            .then(function (response) {
                logger.info(JSON.stringify(response.data));
                resolve(true);
            })
            .catch(function (error) {
                console.log(error);
                reject(false)
                logger.error(error);
            });
        });
    }

    public static async ImportKeyAVM(cb58PrivateKey : string, config: ConfigurationType): Promise <string> {

        return new Promise(async (resolve, reject) => {
            logger.info("Importing key..");
            var data = JSON.stringify(
                {
                    "jsonrpc": "2.0",
                    "id": 1,
                    "method": "avm.importKey",
                    "params": {
                        "username": Constants.KEYSTORE_USER,
                        "password": Constants.KEYSTORE_PASSWORD,
                        "privateKey": cb58PrivateKey
                    }
                }
            );

            var request = {
                method: 'post',
                url: config.rpc_keystore + '/ext/bc/X',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(request) .then(function (response) {
                logger.info(response.data);
                resolve(response.data.result.address);
                logger.info(JSON.stringify(response.data));
            })
            .catch(function (error) {
                reject(false);
                logger.error(error);
            });

        });
    }

    public async generateAccounts(testCase : TestCase) {

        var numberOFAccountsToCreate: number = testCase.Threads;
        console.log("Accounts to create : ",numberOFAccountsToCreate)
        let currentAccounts = [];

        // if (fs.existsSync(Constants.PRIVATE_KEYS_FILE)) {
        //     logger.info("Reading accounts from file...");
        //     let data = fs.readFileSync(Constants.PRIVATE_KEYS_FILE, 'utf8');
        //     currentAccounts = data.split('\n');

        //     if (currentAccounts.length > 0) {
        //         currentAccounts = currentAccounts.slice(0, currentAccounts.length - 1);
        //     }
        // }

        if (currentAccounts.length<numberOFAccountsToCreate){
          numberOFAccountsToCreate =  numberOFAccountsToCreate - currentAccounts.length;
        }
        else if(currentAccounts.length >= numberOFAccountsToCreate) {
            numberOFAccountsToCreate = 0;
            logger.info("Accounts already generated");
            return [];
        }

        logger.info("Generating accounts...", numberOFAccountsToCreate);
        let privateKeys: string[] = [];

        for (let i = 0; i < numberOFAccountsToCreate; i++) {
            let account = await this.web3.eth.accounts.create(this.web3.utils.randomHex(32))
            privateKeys.push(account.privateKey)
        }

        return privateKeys;
    }

    // create function to get transaction details and read the status using getTxStatus
    public async getTransactionDetails(txHash : string, config: ConfigurationType): Promise < any > {
        var data = JSON.stringify(
            {
                "jsonrpc": "2.0",
                "id": 1,
                "method": "avm.getTxStatus",
                "params": {
                    "txID": txHash
                }
            }
        );

        var configRq = {
            method: 'post',
            url: config.rpc + '/ext/bc/X',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios(configRq);
    }

    //get utxos

    public static convertHexPkToCB58(hexPrivKey: string): string {
        let bintools: BinTools = BinTools.getInstance()
        let buf: Buffer = Buffer.from(hexPrivKey, 'hex')
        let encoded: string = `PrivateKey-${
            bintools.cb58Encode(buf)
        }`
        return encoded;
    }

    public static GetPendingValidators(config: ConfigurationType) : Promise <any> {
        
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "platform.getPendingValidators",
                "params": {}
            });

            var request = 
            {
                method: 'post',
                url: config.rpc + '/ext/bc/P',
                headers: { 
                'Content-Type': 'application/json'
                },
                data : data
            };

            axios(request)
            .then(function (response) {
                resolve(response.data.result.validators);
            })
            .catch(function (error) {
                reject(error);
                console.log(error);
            });
        });
    }
    
    public static translateCb58PKToHex(cb58PrivateKey: string): string {
        const bintools: BinTools = BinTools.getInstance()
        const privKey: string = cb58PrivateKey;
        const hex: Buffer = bintools.cb58Decode(privKey.split('-')[1]);
        return hex.toString('hex');
    }
    
    public static validateIfCurrentApiNodesExists(testcase : TestCase, prevtestcase : TestCase)
    {
        return(testcase.ApiNodes == prevtestcase.ApiNodes)
    }
    //method to validate if service is up
    public static async validateIfCurrentValidatorsExists(config: ConfigurationType, testCase : TestCase) : Promise <boolean> {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({
                "jsonrpc": "2.0",
                "method": "platform.getCurrentValidators",
                "params": {
                  "subnetID": null,
                  "nodeIDs": []
                },
                "id": 1
              });

            var request = {
                method: 'post',
                url: config.rpc + '/ext/bc/P',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
              };

            axios(request)
            .then(function (response) {
                resolve(testCase.ValidatorNodes == response.data.result.validators.length);
            })
            .catch(function (error) {
                console.log("Validator are not ready");
                resolve(false);
            });
        });
    }

    public static async isBootstraped(config: ConfigurationType) : Promise <boolean> {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "info.isBootstrapped",
                "params": {
                  "chain": "C"
                }
              });
              
              var request = {
                method: 'post',
                url: config.rpc + '/ext/info',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
              };
              
              axios(request)
              .then(function (response) {
                resolve(response.data.result.isBootstrapped == true);
              })
              .catch(function (error) {
                reject(false);
                console.log(error);
              });              
        });
    }

}

export default utilsX;