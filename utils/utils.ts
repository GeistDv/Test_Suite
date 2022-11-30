import Web3 from "web3";
//import config from "../config.json";
import fs, { constants, promises } from "fs";
import { BinTools, Buffer } from "avalanche";
import axios from "axios";
import { ConfigurationType } from "../types/configurationtype";
import DataFlow from "../types/dataflowtype";
import { logger, errorLogger } from "./logger";
import { Constants } from "../constants";
import NetworkRunner from "../network-runner/NetworkRunner";
import KubectlChecker from '../automation/KubectlChecker';
import TestCase from "../types/testcase";
import { getXKeyChain } from './configAvalanche';
import XchainBuilder from "../builders/XchainBuilder";
import XChainTestWallet from "./XChainTestWallet";
import AvalancheXChain from "../types/AvalancheXChain";
import { KeyChain } from "@c4tplatform/caminojs/dist/apis/avm"
import ITransactionBuilder from "../interfaces/ItransactionBuilder";
import xChainBuilder from "../builders/XchainBuilder";
import testbuilderErc20 from '../builders/ERC20TXBuilder';

class Utils {

    Configuration: ConfigurationType;
    dataFlow: DataFlow;
    web3: Web3;

    //xchain transaction optional variables
    urlRpc!: URL;
    xChainAvalanche!: AvalancheXChain;
    protocolRPC!: string;
    mainAccount!: XChainTestWallet;

    //optional variable private keys
    privateKeys!: any[];

    txBuilder: ITransactionBuilder;
    constructor(configTypeForCompleteTest: ConfigurationType, dataFlow: DataFlow) {

        this.Configuration = configTypeForCompleteTest;
        this.web3 = new Web3(this.Configuration.rpc_keystore + '/ext/bc/C/rpc');;
        this.dataFlow = dataFlow;
        this.txBuilder = new testbuilderErc20(this.Configuration, this.web3, this.dataFlow);
    }


    public static async createUserAccount(config: ConfigurationType): Promise<boolean> {

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
                    errorLogger.error(error);
                });
        });
    }


    public static async ImportKeyEVM(cb58PrivateKey: string, config: ConfigurationType): Promise<boolean> {

        return new Promise(async (resolve, reject) => {
            var data = JSON.stringify({
                "method": "avax.importKey",
                "params": {
                    "username": "netacticateam",
                    "password": "felipantiago45",
                    "privateKey": cb58PrivateKey
                },
                "jsonrpc": "2.0",
                "id": 1
            });

            var request = {
                method: 'post',
                url: config.rpc_keystore + '/ext/bc/C/avax',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(request)
                .then(function (response) {
                    resolve(true);
                    logger.info(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    reject(false)
                    errorLogger.error(error);
                });
        });
    }

    public static async ImportKeyAVM(cb58PrivateKey: string, config: ConfigurationType): Promise<string> {

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

            axios(request).then(function (response) {
                logger.info(response.data);
                resolve(response.data.result.address);
                logger.info(JSON.stringify(response.data));
            })
                .catch(function (error) {
                    reject(false);
                    errorLogger.error(error);
                });

        });
    }

    public async generateAccounts(testCase: TestCase) {

        var numberOFAccountsToCreate: number = testCase.Threads;
        console.log("Accounts to create : ", numberOFAccountsToCreate)
        let currentAccounts = [];

        if (fs.existsSync(Constants.PRIVATE_KEYS_FILE)) {
            logger.info("Reading accounts from file...");
            let data = fs.readFileSync(Constants.PRIVATE_KEYS_FILE, 'utf8');
            currentAccounts = data.split('\n');

            if (currentAccounts.length > 0) {
                currentAccounts = currentAccounts.slice(0, currentAccounts.length - 1);
            }
        }

        if (currentAccounts.length < numberOFAccountsToCreate) {
            numberOFAccountsToCreate = numberOFAccountsToCreate - currentAccounts.length;
        }
        else if (currentAccounts.length >= numberOFAccountsToCreate) {
            numberOFAccountsToCreate = 0;
            logger.info("Accounts already generated");
            return [];
        }

        logger.info("Generating accounts...", numberOFAccountsToCreate);
        let privateKeys: string[] = [];

        for (let i = 0; i < numberOFAccountsToCreate; i++) {
            let account = await this.web3.eth.accounts.create(this.web3.utils.randomHex(32));
            privateKeys.push(account.privateKey)
        }

        return privateKeys;
    }

    public async generateAccountsXchain(testCase: TestCase) {

        let privateKeys: XChainTestWallet[] = [];
        let promisesXChainWallet = [];
        //Create Private Keys and Wallets
        for (let i = 0; i < 20; i++) {
            console.log("Batch -> ", i);
            let promisePrivateKeys: XChainTestWallet[];
            for (let x = 0; x < (testCase.Threads * 0.05); x++) {
                promisesXChainWallet.push(XChainTestWallet.importKeyAndCreateWallet(this.web3, this.Configuration, this.urlRpc, this.protocolRPC, this.dataFlow.networkID, this.dataFlow.assetID, this.dataFlow.blockchainIDXChain));
            }
            promisePrivateKeys = await Promise.all(promisesXChainWallet);
            console.log("Response Batch -> ", promisePrivateKeys);
            privateKeys = privateKeys.concat(promisePrivateKeys);
            promisesXChainWallet = []
            promisePrivateKeys = []
        }

        console.log("Lenght Private Keys -> ", privateKeys.length);
        return privateKeys;
    }

    // create function to get transaction details and read the status using getTxStatus
    public async getTransactionDetails(txHash: string, config: ConfigurationType): Promise<any> {
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

    //export funds from x to c chain
    public async transferFunds() {

        console.log("transfering funds from X to C chain...");
        var balance: number = await this.getBalance();
        await this.exportFunds((balance / 2).toString())
        //TODO : improve, check the export tx is completed.
        await new Promise(r => setTimeout(r, 10000));
        var txId = await this.importFunds();
        console.log('already import')
        console.log('txId: ', txId)
        var statusTx: String = '';
        while(statusTx.toUpperCase() != "ACCEPTED" || statusTx.toUpperCase() == "REJECTED")
        {
        statusTx = await this.txStatus(txId);
        }
    }

    public async txStatus(txId: String):Promise<String>{
        return new Promise(async (resolve, reject) =>{
            var data = JSON.stringify({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "avax.getAtomicTxStatus",
                "params": {
                  "txID": txId
                }
              });
              
              var config = {
                method: 'post',
                url: 'https://santi.camino.network/static/ext/bc/C/avax',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
              };
              
              axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
                resolve(response.data.result.status)
              })
              .catch(function (error) {
                console.log(error);
              });
        })
    }

    public async importFunds(): Promise<String> {
        return new Promise(async (resolve, reject) => {
            var data: string = JSON.stringify({
                "method": "avax.import",
                "params": {
                    "username": Constants.KEYSTORE_USER,
                    "password": Constants.KEYSTORE_PASSWORD,
                    "sourceChain": "X",
                    "to": this.dataFlow.hex_cchain_address
                },
                "jsonrpc": "2.0",
                "id": 1
            });

            var config = {
                method: 'post',
                url: this.Configuration.rpc_keystore + '/ext/bc/C/avax',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    resolve(response.data.result.txID);
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    reject(false);
                    console.log(error);
                });
        });
    }

    public async exportFunds(balance: string): Promise<boolean> {

        return new Promise(async (resolve, reject) => {
            var data = JSON.stringify({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "avm.export",
                "params": {
                    "from": [
                        this.dataFlow.bech32_xchain_address
                    ],
                    "to": this.dataFlow.bech32_cchain_address,
                    "amount": balance,
                    "assetID": "CAM",
                    "changeAddr": this.dataFlow.bech32_xchain_address,
                    "username": Constants.KEYSTORE_USER,
                    "password": Constants.KEYSTORE_PASSWORD
                }
            });

            var config = {
                method: 'post',
                url: this.Configuration.rpc_keystore + '/ext/bc/X',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    resolve(true);
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    reject(false);
                    console.log(error);
                });
        });
    }

    public async getBalance(): Promise<number> {

        return new Promise((resolve, reject) => {
            var data = JSON.stringify({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "avm.getAllBalances",
                "params": {
                    "address": this.dataFlow.bech32_xchain_address
                }
            });

            var config = {
                method: 'post',
                url: this.Configuration.rpc + '/ext/bc/X',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {

                    if (response.data.result.balances.length > 0) {
                        resolve(response.data.result.balances[0].balance);
                    }
                    else {
                        console.log('Private key doesnt have any balance');
                        reject('Private key doesnt have any balance');
                    }

                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        });

    }


    public async generateAndFundWallets(testCase: TestCase, xChainbuilder?: ITransactionBuilder) {
        if (testCase.Chain == "C") {
            let accounts = await this.generateAccounts(testCase);
            var chunks = this.splitListIntoChunksOfLen(accounts, 20);
            let nonce = await this.web3.eth.getTransactionCount(this.dataFlow.hex_cchain_address);
            for (let i = 0; i < chunks.length; i++) {

                let chunk = chunks[i];
                let promises = [];
                let promisesMint = [];

                for (let j = 0; j < chunk.length; j++) {
                    let account = chunk[j];
                    if (testCase.TestType == "erc20tx" || testCase.TestType == "erc1155tx") {
                        promisesMint.push(await this.txBuilder.mint?.("0x" + this.dataFlow.hexPrivateKey, this.web3, account, nonce));
                        nonce++;
                    }
                    promises.push(this.sendFunds(account, nonce));
                    nonce++;
                }

                await Promise.all(promises);
                if (testCase.TestType == "erc20tx") {
                    await Promise.all(promisesMint);
                }
            }
        }
        else { //X Chain

            let accountsWithoutFunds = await this.generateAccountsXchain(testCase);
            this.privateKeys = accountsWithoutFunds;

            console.log("Fund Accounts, wait please......");
            let txIDMultiple : string = await this.multipleFundsAVM(
                this.privateKeys,
                this.mainAccount.avalancheXChain.avaxAssetID,
                parseFloat(this.web3.utils.toWei("60", 'gwei')),
                this.mainAccount
            );

            let statusTx : string = "";

            while(statusTx.toUpperCase() != "ACCEPTED" && statusTx.toUpperCase() != "REJECTED")
            {
                statusTx = await Utils.getTxStatusAVM(this.Configuration, txIDMultiple);
                console.log("Status TX -> ", statusTx);
            }

            console.log("txIDMultiple -> ", txIDMultiple);

            console.log("Private Keys -> ", this.privateKeys);

            /*
            let baseAmount: number = parseFloat(this.web3.utils.toWei(Constants.INITIAL_FUNDS, 'gwei')) * testCase.Threads;
            let initialAccountsWithFunds: XChainTestWallet[] = [];

            //First 10 Transactions
            for (let i = 0; i < 10; i++) {
                await Utils.sendTransactionXChain(this.mainAccount, accountsWithoutFunds[i], baseAmount.toString(), this.xChainAvalanche, xChainbuilder);
                initialAccountsWithFunds.push(accountsWithoutFunds[i]);
                accountsWithoutFunds = accountsWithoutFunds.filter((account) => account.xChainAddress != accountsWithoutFunds[i].xChainAddress);
            }

            if (testCase.Threads > 10) {
                this.processFundsXChain(initialAccountsWithFunds, accountsWithoutFunds, xChainbuilder);
            }*/

        }
        logger.info("Done!");
    }

    //Multiple Funds AVM
    private async multipleFundsAVM(accounts: XChainTestWallet[], assetID: string, amount: number, mainAccount: XChainTestWallet) : Promise<string> {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "avm.sendMultiple",
                "params": {
                    "outputs": accounts.map((account) => {

                        let transaction = {
                            "assetID": account.avalancheXChain.avaxAssetID,
                            "to": account.xChainAddress,
                            "amount": amount
                        }
                        return transaction;
                    }),
                    "from": [mainAccount.xChainAddress],
                    "changeAddr": mainAccount.xChainAddress,
                    "memo": "",
                    "username": Constants.KEYSTORE_USER,
                    "password": Constants.KEYSTORE_PASSWORD
                }
            });

            var config = {
                method: 'post',
                url: this.Configuration.rpc_keystore + '/ext/bc/X',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config).then(function (response) {
                resolve(response.data.result.txID)
            }).catch(function (error) {
                console.log(error);
                reject(error);
            });
        });
    }

    //Process Fund
    private async processFundsXChain(initialAccountsWithFunds: XChainTestWallet[], accountsWithoutFunds: XChainTestWallet[], xChainbuilder?: ITransactionBuilder) {
        let queues: any[][] = this.splitListIntoChunksOfLenXchain(accountsWithoutFunds, initialAccountsWithFunds.length);
        console.log("queues", queues);
        let promises = [];

        for (let i = 0; i < queues.length; i++) {
            var txs: any[][] = queues[i].map((value, index) => [initialAccountsWithFunds[i], value]);
            promises.push(this.executeQueue(txs, xChainbuilder));
        }

        await Promise.all(promises);

    }

    private async executeQueue(queue: any, xChainbuilder?: ITransactionBuilder) {
        for (let i = 0; i < queue.length; i++) {
            let amountTransfer = this.web3.utils.toWei(Constants.INITIAL_FUNDS, 'gwei');
            await Utils.sendTransactionXChain(queue[i][0], queue[i][1], amountTransfer, queue[i][0].avalancheXChain, xChainbuilder);
        }
    }

    private splitListIntoChunksOfLenXchain(list: any[], len: any) {
        let chunks: any[][] = [];
        let i = 0, n = list.length;
        while (i < n) {
            chunks.push(list.slice(i, i += len));
        }
        return chunks;
    }

    private splitListIntoChunksOfLen(list: any[], len: number) {
        let chunks = [], i = 0, n = list.length;
        while (i < n) {
            chunks.push(list.slice(i, i += len));
        }
        return chunks;
    }

    public async sendFunds(privatekey: string, nonce: number) {

        let sendTo = await this.web3.eth.accounts.privateKeyToAccount(privatekey);

        console.log("Sending funds to: ", sendTo.address, "nonce: ", nonce);
        let txData = {
            'nonce': nonce,
            'maxFeePerGas': Constants.MAXFEEPERGAS,
            'maxPriorityFeePerGas': Constants.MAXPRIORITYFEEPERGAS,
            'gas': Constants.GAS,
            'to': sendTo.address,
            'from': this.dataFlow.hex_cchain_address,
            'value': Web3.utils.toWei(Constants.INITIAL_FUNDS),
            'chainId': this.dataFlow.chainId
        }

        var signed = await this.web3.eth.accounts.signTransaction(txData, "0x" + this.dataFlow.hexPrivateKey);
        console.log("Sending funds transaction... ", signed.transactionHash);
        var data = await this.web3.eth.sendSignedTransaction(signed.rawTransaction!);
        var stringToWrite: string = (fs.existsSync('privatekeys.csv') ? '\n' : '') + privatekey;
        fs.appendFileSync('privatekeys.csv', stringToWrite);
        console.log('Transaction succcesfull', data.transactionHash);
    }

    public async sendFundsXChain(privatekey: string) {
        console.log("PRivate key ->", privatekey);

    }

    public static convertHexPkToCB58(hexPrivKey: string): string {
        let bintools: BinTools = BinTools.getInstance()
        let buf: Buffer = Buffer.from(hexPrivKey, 'hex')
        let encoded: string = `PrivateKey-${bintools.cb58Encode(buf)
            }`
        return encoded;
    }

    public static GetPendingValidators(config: ConfigurationType): Promise<any> {

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
                data: data
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

    public static async getBlockDetails(web3: Web3, blockNumberFrom: number) {

        var currentBlockNumber = await web3.eth.getBlockNumber();
        var blockTimestamps: string[] = [];
        var blockTimes: number[] = [];
        var blocks: number[] = [];

        var totalBlocks = currentBlockNumber - blockNumberFrom;
        //get all block from a given block number
        for (var i = 0; i < totalBlocks; i++) {
            var block = await web3.eth.getBlock(blockNumberFrom + i);
            blocks.push(block.number);
            blockTimestamps.push(block.timestamp.toString());
        }

        //read all timestamps and calculate the average time between blocks
        var total = 0;
        for (var i = 0; i < blockTimestamps.length - 1; i++) {
            blockTimes.push(parseInt(blockTimestamps[i + 1]) - parseInt(blockTimestamps[i]));
        }

        //sum all block times
        for (var i = 0; i < blockTimes.length; i++) {
            total += blockTimes[i];
        }

        //get index of the longest block time
        var max = Math.max.apply(Math, blockTimes);
        var maxIndex = blockTimes.indexOf(max);

        logger.info('blockNumber with max', blocks[maxIndex], max);
        logger.info("Average time between blocks: " + total / blockTimes.length);

        //get the maximum block time and the minimum block time
        var max = Math.max.apply(Math, blockTimes);
        var min = Math.min.apply(Math, blockTimes);
        logger.info("Max block time: " + max);
        logger.info("Min block time: " + min);

        let dataResponse = {
            blockNumberWithMax: blocks[maxIndex],
            averageTimeBetweenBlocks: total / blockTimes.length,
            maxBlockTime: max,
            minBlockTime: min
        }

        return dataResponse;
    }

    public static async validateIfCurrentApiNodesExists(testcase : TestCase)
    {
        var  KubectlCheckerApi : KubectlChecker= new KubectlChecker(`kubectl top pods --all-namespaces | grep "${process.env.networkName}-api"`);
        await KubectlCheckerApi.execCommandWithoutMetrics();
        try{
            let apiNodes : string[] = String(KubectlCheckerApi.dataPods).trim().split("\n");
            console.log("Network Api Nodes:",apiNodes.length);
            console.log("TestCase APi Nodes:", testcase.ApiNodes)
            return(testcase.ApiNodes == apiNodes.length)
        }
        catch (e)
        {
            console.log("Something went wrong evaluating the api nodes");
            return false;
        }
        
    }
    //method to validate if service is up
    public static async validateIfCurrentValidatorsExists(config: ConfigurationType, testCase: TestCase): Promise<boolean> {
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
                data: data
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

    public static async isBootstraped(config: ConfigurationType): Promise<boolean> {
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
                data: data
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

    public static async getStakingAssetID(config: ConfigurationType): Promise<string> {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "platform.getStakingAssetID",
                "params": {}
            });

            var request = {
                method: 'post',
                url: config.rpc + '/ext/bc/P',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(request).then(function (response) {
                resolve(response.data.result.assetID);
            }).catch(function (error) {
                reject(null);
            });
        });
    }

    public static async getNetworkID(config: ConfigurationType): Promise<string> {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "info.getNetworkID",
                "params": {
                }
            });

            var request = {
                method: 'post',
                url: config.rpc + '/ext/info',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(request).then(function (response) {
                resolve(response.data.result.networkID);
            }).catch(function (error) {
                reject(null);
            });
        });
    }

    public static async sendTransactionXChain(addressFrom: XChainTestWallet, addressTo: XChainTestWallet, amount: string, xChainFlow: AvalancheXChain, xchainBuilder?: ITransactionBuilder) {
        try {
            let txId = await xchainBuilder?.buildAndSendTransaction(addressFrom, "", addressTo, amount, xChainFlow);

            console.log("Amount To Send -> ", amount);
            console.log("Address ->", addressTo.xChainAddress);
            console.log("New Balance ->", await addressTo.avalancheXChain.xchain.getBalance(addressTo.xChainAddress, addressTo.avalancheXChain.avaxAssetID));
            console.log("Tx ID -> ", txId);
            return txId;
        }
        catch (e) {
            errorLogger.error(e);
            console.log(e);
        }
    }

    public static async getBlockchainID(config: ConfigurationType, chain: string): Promise<string> {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "info.getBlockchainID",
                "params": {
                    "alias": chain
                }
            });

            var request = {
                method: 'post',
                url: config.rpc + '/ext/info',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(request).then(function (response) {
                resolve(response.data.result.blockchainID);
            }).catch(function (error) {
                reject(null);
            });
        });
    }

    public static async getTxStatusAVM(config: ConfigurationType, txID: string) : Promise<string> {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "avm.getTxStatus",
                "params": {
                    "txID": txID
                }
            });

            var request = {
                method: 'post',
                url: config.rpc + '/ext/bc/X',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(request).then(function (response) {
                resolve(response.data.result.status);
            }).catch(function (error) {
                reject(null);
            });
        });
    }

    public static async deleteUser(config: ConfigurationType) : Promise<any> {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "keystore.deleteUser",
                "params" : {
                    "username": Constants.KEYSTORE_USER,
                    "password": Constants.KEYSTORE_PASSWORD
                }
            });

            var request = {
                method: 'post',
                url: config.rpc + '/ext/keystore',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(request).then(function (response) {
                resolve(response.data.result);
            }).catch(function (error) {
                reject(null);
            });
        });
    }

}

export default Utils;
