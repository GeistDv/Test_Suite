import Web3 from 'web3';
import { ConfigurationType } from '../types/configurationtype';
import DataFlow from '../types/dataflowtype';
import ITransactionBuilder from './ItransactionBuilder';
import { logger } from "../utils/logger";
import { Constants } from '../constants';

class STRGTXBuilder implements ITransactionBuilder {
    
    ContractAbi : any;
    Configuration : ConfigurationType;
    DataFlow : DataFlow;
    web3 : Web3;

    constructor(Config : ConfigurationType, web3 : Web3, dataFlow : DataFlow) {
        this.ContractAbi = require('../contracts/storage.json');
        this.Configuration = Config;
        this.web3 = web3;
        this.DataFlow = dataFlow;
    }

    async deployContract(privateKey : string, web3 : Web3) : Promise<string> 
    {
        return new Promise(async (resolve, reject) => {
            let account = web3.eth.accounts.privateKeyToAccount(privateKey);
            web3.eth.accounts.wallet.clear();
            web3.eth.accounts.wallet.add("0x" + privateKey);
            console.log("Deploying contract...");
            let contract = new web3.eth.Contract(this.ContractAbi.abi);

            await contract.deploy({
                data: this.ContractAbi.data.bytecode.object,
                arguments: []
            })
            .send({
                from: account.address, 
                gasPrice : this.DataFlow.gasPrice,
                gas : Constants.GAS
            })
            .then((newContractInstance) => {
                console.log("Contract deployed at address: " + newContractInstance.options.address);
                resolve(newContractInstance.options.address);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
    }

    async buildAndSendTransaction(
        privateKey : string,
        contractAddress : string, 
        sendTo : string): Promise<string> 
    {
        logger.info('sending tx..');
        return new Promise(async (resolve, reject) => {
            
            var accountFrom = this.web3.eth.accounts.privateKeyToAccount(privateKey);
            var nonce = await this.web3.eth.getTransactionCount(accountFrom.address);
            var contract = new this.web3.eth.Contract(this.ContractAbi.abi, contractAddress);
            const data = contract.methods.store(10).encodeABI();
            
            var txData = {
              nonce:nonce,
              maxFeePerGas: this.web3.utils.toHex(Constants.MAXFEEPERGAS),
              maxPriorityFeePerGas: this.web3.utils.toHex(Constants.MAXPRIORITYFEEPERGAS),
              gas : this.web3.utils.toHex(Constants.GAS),
              from: accountFrom.address,
              to: contractAddress,
              value: this.web3.utils.toHex(0),
              data: data
            };

            this.web3.eth.accounts.signTransaction(txData, privateKey)
            .then(signed => {
                this.web3.eth.sendSignedTransaction(signed.rawTransaction!).then((data =>{
                    resolve(data.transactionHash);
                })).catch(err =>{
                    console.log(err);
                    reject(err)
                })
            });
        })
    }
}

export default STRGTXBuilder;