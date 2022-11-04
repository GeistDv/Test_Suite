import Web3 from "web3";
import express from "express";
import ITransactionBuilder from "./builders/ItransactionBuilder";
import { ConfigurationType, ConfigurationTypeForCompleteTest, SimpleConfigurationType } from "./types/configurationtype";
import SimpleFunds from "./builders/SendXChainBuilder";
import SimpleTXBuilder from "./builders/SimpleTXBuilder";
import ERC20TXBuilder from "./builders/ERC20TXBuilder";
import ERC1155TXBuilder from "./builders/ERC1155TXBuilder";
import STRGTXBuilder from "./builders/STRGTXBuilder";
import Utils from "./utils/utils";
import bodyParser, { text } from "body-parser";
import fs from "fs";
import SendXChainBuilder from "./builders/SendXChainBuilder";
import DataFlow from "./types/dataflowtype";
import * as child from 'child_process';
import { logger, errorLogger } from "./utils/logger";
import { startTestsAndGatherMetrics } from './automation/starterJmeter';
import { Constants } from "./constants";
import { getConfigTypeWithNetworkRunner } from './network-runner/scripterNR';
import DataTests from './DataTest';
import dotenv from 'dotenv';

import NetworkRunner from './network-runner/NetworkRunner';
import TestCase from "./types/testcase";
import XchainBuilder from './builders/XchainBuilder';
import { getXKeyChain } from './utils/configAvalanche';
import { basename } from "path";

import XChainTestWallet from './utils/XChainTestWallet';
import xChainBuilder from "./builders/XchainBuilder";

dotenv.config();
// Needed for self signed certs.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/*global variables*/
var pathGrungni = process.env.GRUNGNI_PATH;
let privateKeys: string[] = [];
let chainId: number = 0;
let gasPrice: number;
let balance: string;
let blockNumber: number;

let txBuilder: ITransactionBuilder;
let utils: Utils;
let amount = 0;
let contractAddress: string;
let accountPKWithFundsCB58: string = "";
let accountPKPingPongCb58: string = "";
let Bech32AddressA: string;
let Bech32AddressB: string;

// this is used for pingpong test;
let txBuilderB: ITransactionBuilder;

let networkRunner: NetworkRunner;

let web3: Web3;
const app = express();
app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.send("it is working!");
});

//complete test reading from google sheets
app.post("/start", async (req, res) => {

    let completeTestConfiguration: ConfigurationTypeForCompleteTest = req.body;

    //extract last route from url
    var networkName = completeTestConfiguration.rpc.split("/").pop();

    //read json file
    var jsonData: any = JSON.parse(fs.readFileSync(pathGrungni + "/" + networkName + ".json", "utf8"));
    var privateKeyFirstStaker = jsonData.Stakers[0].PrivateKey;

    //cast into configurationtype
    let configType: ConfigurationType = completeTestConfiguration as ConfigurationType;
    configType.private_key_with_funds = privateKeyFirstStaker;

    //read the document.
    let testCases = await DataTests.readDataTest(completeTestConfiguration.sheet_name);

    //for each test case, execute the test.
    for (let i = 0; i < testCases.length; i++) {

        let testCase = testCases[i];
        let prevTestCase: TestCase;
        if (i > 0) {
            prevTestCase = testCases[i - 1]
        }
        else {
            prevTestCase = testCases[i]
        }

        console.log("Running case .. " + i);
        await initNetwork(testCase, prevTestCase, networkName, configType);
        var dataFlow = await initApp(configType);
        await initPrivateKeys(dataFlow, testCase);
        await startTestsAndGatherMetrics(testCase, configType);
    }

    console.log("Finished all tests");

    res.send('ok');
});

//execute single tests reading from google sheets
app.post("/network-runner", async (req, res) => {

    let testCases = await DataTests.readDataTest(req.body.sheet_name);

    for (let i = 0; i < testCases.length; i++) {
        let testCase = testCases[i];
        networkRunner = await getConfigTypeWithNetworkRunner(req, testCase);
        let configType = networkRunner.configuration;
        let dataFlow = await initApp(networkRunner.configuration);

        await initPrivateKeys(dataFlow, networkRunner.testCase);
        await startTestsAndGatherMetrics(networkRunner.testCase, configType);
        await networkRunner.killGnomeTerminal();
    }

    return res.status(200).send("Network Runner executed");
});

app.post("/network-runner/x-chain-test", async (req, res) => {
    let testCase: TestCase = {
        StakingAmount: req.body.StakingAmount,
        ValidatorNodes: req.body.ValidatorNodes,
        ApiNodes: req.body.ApiNodes,
        Threads: req.body.Threads,
        Loops: req.body.Loops,
        Chain: "X",
        TestType: req.body.TestType,
        Position: 0
    }

    networkRunner = await getConfigTypeWithNetworkRunner(req, testCase);

    web3 = new Web3(networkRunner.configuration.rpc + '/ext/bc/C/rpc');

    await Utils.createUserAccount(networkRunner.configuration);


    let assetID = await Utils.getStakingAssetID(networkRunner.configuration);
    let networkID = parseInt(await Utils.getNetworkID(networkRunner.configuration));
    let url = new URL(networkRunner.configuration.rpc);
    let port = "443";
    let protocolRPC = url.protocol.replace(":", "");

    if (url.port != "") {
        port = url.port;
    }

    let accountAVM = await Utils.ImportKeyAVM(networkRunner.configuration.private_key_with_funds, networkRunner.configuration);
    //let accountEVM = await Utils.ImportKeyEVM(networkRunner.configuration.private_key_with_funds, networkRunner.configuration);
    let xChainAvalanche = await getXKeyChain(url.hostname, parseInt(url.port), protocolRPC, networkID, networkRunner.configuration.private_key_with_funds, assetID);

    let accountsXChain: XChainTestWallet[] = [];
    let promisesXChainWallet = [];

    //Create Private Keys and Wallets
    for (let x = 0; x < networkRunner.testCase.Threads; x++) {
        promisesXChainWallet.push(XChainTestWallet.importKeyAndCreateWallet(web3, networkRunner, url, protocolRPC, networkID, assetID));
    }
    accountsXChain = await Promise.all(promisesXChainWallet);

    //Founds Wallets
    let baseAmount: number = 100000000000000;
    let baseSend : number = 4000000;
    let allFunded = false;
    let firstFunded = true;
    let count = 0;

    let repeatsFund = networkRunner.testCase.Threads / 10;
    let fundedAccounts : XChainTestWallet[] = [];
    
    while (!allFunded) {

        if(firstFunded)
        {
            for (let x2 = 0; x2 < 10; x2++) {
                let txIdXChain = await Utils.sendFoundTransactionXChain(accountAVM, accountsXChain[x2], xChainAvalanche, baseAmount);
                console.log("txIdXChain -> ", txIdXChain);
                fundedAccounts.push(accountsXChain[x2]);
            }

            firstFunded = false;
        }
        else
        {
            for (let u = 0; u < repeatsFund - 1; u++) {
                
                let promiseAllTxFund = [];
                let fundSend = baseSend;

                for(let c = 0; c < 10; c++)
                {
                    promiseAllTxFund.push(Utils.sendTransactionXChain(accountsXChain[c], accountsXChain[u + 10], url, assetID, networkID, protocolRPC, fundSend, accountsXChain[c].avalancheXChain));
                    fundedAccounts.push(accountsXChain[u + 10]);
                }

                await Promise.all(promiseAllTxFund);
            }
            allFunded = true;
        }
        count = count + 10;
    }
    
    let promiseTransactions = [];

    //Repeat Cicle for start transactions
    for (let k = 0; k < accountsXChain.length; k++) {
        console.log(k);
        await Utils.sendTransactionXChain(accountsXChain[k], accountsXChain[accountsXChain.length - k - 1], url, assetID, networkID, protocolRPC, 1, accountsXChain[k].avalancheXChain);
    }

    console.log("Starting Transactions....");

    //await Promise.all(promiseTransactions);

    await networkRunner.killGnomeTerminal();
    

    return res.status(200).send("Execution Test Finished");

});

// single endpoint to test (cloud)
app.post('/', async (req, res) => {

    let privateKey = privateKeys[req.body.ID - 1];
    let sendTo = privateKeys[req.body.ID];

    if (req.body.ID == privateKeys.length) {
        sendTo = privateKeys[0];
    }

    txBuilder.buildAndSendTransaction(privateKey, contractAddress, sendTo, Constants.AMOUNT_TO_TRANSFER)
        .then(data => {
            res.send(data);
        }).catch(err => {
            errorLogger.error(err);
            res.status(500).send(err);
        });
});

app.post('/pingpong', async (req, res) => {
    amount++;

    try {
        var txIDA = await txBuilder.buildAndSendTransaction('', contractAddress, Bech32AddressB, amount.toString());

        var accepted: boolean = false;
        while (!accepted) {
            var response = await utils.getTransactionDetails(txIDA, networkRunner.configuration);
            accepted = response.data.result.status == "Accepted";
        }

        var txIDB = await txBuilderB.buildAndSendTransaction('', contractAddress, Bech32AddressA, amount.toString());

        var accepted: boolean = false;
        while (!accepted) {
            var response = await utils.getTransactionDetails(txIDB, networkRunner.configuration);
            accepted = response.data.result.status == "Accepted";
        }

        res.send({ 'txIDA': txIDA, 'txIDB': txIDB });
    } catch (err) {
        errorLogger.error(err);
    }

});

app.listen(process.env.PORT, () => {
    logger.info(`Server running on port ${process.env.PORT}`);
    console.log(`Server running on port ${process.env.PORT}`);
});

async function initApp(configType: ConfigurationType): Promise<DataFlow> {

    //TODO : validate grugni path.
    web3 = new Web3(configType.rpc + '/ext/bc/C/rpc');
    gasPrice = parseInt(await web3.eth.getGasPrice());
    chainId = await web3.eth.getChainId();
    blockNumber = await web3.eth.getBlockNumber();

    console.log("Gas price: ", gasPrice);
    console.log("Block number: ", blockNumber);

    let dataFlow = await initDataFlowAccount(configType);
    utils = new Utils(configType, dataFlow);
    initBuilder(configType, dataFlow);
    return dataFlow;
}

async function initDataFlowAccount(configurationtype: ConfigurationType): Promise<DataFlow> {
    await Utils.createUserAccount(configurationtype);
    //TODO : Fix private key duplicated
    var bech32AddressXChain: string = await Utils.ImportKeyAVM(configurationtype.private_key_with_funds, configurationtype);
    await Utils.ImportKeyEVM(configurationtype.private_key_with_funds, configurationtype);

    var hexPK = Utils.translateCb58PKToHex(configurationtype.private_key_with_funds);
    let account = web3.eth.accounts.privateKeyToAccount('0x' + hexPK);
    balance = await web3.eth.getBalance(account.address);

    console.log("Account: ", account.address);
    console.log("Balance: ", balance);
    console.log("Account cb58: " + hexPK);

    var dataFlow: DataFlow = {
        hexPrivateKey: hexPK,
        cb58privateKey: configurationtype.private_key_with_funds,
        bech32_xchain_address: bech32AddressXChain,
        bech32_cchain_address: bech32AddressXChain.replace("X", "C"),
        hex_cchain_address: account.address,
        gasPrice: gasPrice.toString(),
        chainId: chainId
    }

    console.log("Data flow: ", dataFlow);
    return dataFlow;
}


// function to initialize the app
async function initPrivateKeys(dataflow: DataFlow, testCase: TestCase): Promise<Boolean> {

    //evaluate if file exists
    if (fs.existsSync(Constants.PRIVATE_KEYS_FILE)) {
        privateKeys = fs.readFileSync(Constants.PRIVATE_KEYS_FILE).toString().split("\n");
        let account = web3.eth.accounts.privateKeyToAccount(privateKeys[0]);
        balance = await web3.eth.getBalance(account.address);
        if (balance == "0") {
            //delete file privatekeys.csv
            fs.unlinkSync(Constants.PRIVATE_KEYS_FILE);
        }
    }

    if (balance == "0") {
        //import and export
        await utils.transferFunds();
        balance = await web3.eth.getBalance(dataflow.hex_cchain_address);
        console.log('New balance after import/export : ', balance);
    }

    // initialize accounts
    console.log("Generating accounts ... ");
    await utils.generateAndFundWallets(testCase);

    // read file private keys using fs
    privateKeys = fs.readFileSync(Constants.PRIVATE_KEYS_FILE).toString().split("\n");

    return true;

}

async function initBuilder(configurationType: ConfigurationType, dataFlow: DataFlow) {
    // initialize transaction builder
    switch (configurationType.test_type) {
        case "transfer": txBuilder = new SimpleTXBuilder(configurationType, web3, dataFlow);
            // mint
            break;
        default:
            break;
    }
}


async function initNetwork(testCase: TestCase,
    prevTestCase: TestCase,
    networkname: string | undefined,
    configType: ConfigurationType): Promise<Boolean> {
    //TODO: change or for and in validation 
    if (Utils.validateIfCurrentApiNodesExists(testCase, prevTestCase) && await Utils.validateIfCurrentValidatorsExists(configType, testCase)) {
        console.log("Network already has the same number of validators and api nodes");
        return true
    }

    var processKubectl = child.exec("go run main.go k8s destroy " + networkname, { cwd: pathGrungni });

    console.log("Destroying network ...");
    var response = await promiseFromChildProcess(processKubectl);

    while ((await Utils.validateIfCurrentValidatorsExists(configType, testCase))) {
        console.log("Waiting network to be destroyed ..");
        //wait for 5 seconds
        await new Promise(r => setTimeout(r, 5000));
    }

    console.log(testCase.ValidatorNodes);
    var processKubectl = child.exec("go run main.go k8s create " + networkname + " --validators " + testCase.ValidatorNodes + " --api-nodes " + testCase.ApiNodes, { cwd: pathGrungni });

    console.log("Creating network with " + testCase.ValidatorNodes + " validators ...");
    var response = await promiseFromChildProcess(processKubectl);
    console.log("Done ...");

    while (!(await Utils.validateIfCurrentValidatorsExists(configType, testCase))) {
        console.log("Waiting for current validators to be added");
        //wait for 5 seconds
        await new Promise(r => setTimeout(r, 5000));
    }

    console.log("Done ...");
    console.log("Validate if network is bootstrapped ...");

    while (!(await Utils.isBootstraped(configType))) {
        console.log("Waiting for network to be bootstrapped ...");
        //wait for 5 seconds
        await new Promise(r => setTimeout(r, 5000));
    }

    console.log("Done ...");

    return true;
}

async function promiseFromChildProcess(child: any) {
    let outputsData: any[] = [];
    return new Promise(function (resolve, reject) {
        child.stdout.on("data", (data: any) => {
            console.log(data);
        });

        child.stdout.on("close", (data: any) => {
            resolve(outputsData);
        });

        child.addListener("error", reject);
    });
}
