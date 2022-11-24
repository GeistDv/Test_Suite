import Web3 from 'web3';
import ITransactionBuilder from '../interfaces/ItransactionBuilder';
import { ConfigurationType } from '../types/configurationtype';
import DataFlow from '../types/dataflowtype';
import { logger } from "../utils/logger";
import { Constants } from '../constants';

class SimpleTXBuilder implements ITransactionBuilder {
    
    ContractAbi : any;
    Configuration : ConfigurationType;
    DataFlow : DataFlow;
    web3 : Web3;

    constructor(config : ConfigurationType, web3 : Web3, dataFlow : DataFlow) {
        this.ContractAbi = {}
        this.Configuration = config;
        this.web3 = web3;
        this.DataFlow = dataFlow;
    }

    deployContract(privateKey: string, web3: Web3): Promise<string> {
       return new Promise(async (resolve, reject) => {
        resolve("");
       });
    }
    
    async buildAndSendTransaction(
        privateKey : string,
        contractAddress : string, 
        sendTo : string,
        amount : string) : Promise<string> {
        return new Promise(async (resolve, reject) => {
            
            var accountFrom = this.web3.eth.accounts.privateKeyToAccount(privateKey);
            var nonce = await this.web3.eth.getTransactionCount(accountFrom.address);
            var addressendTo = this.web3.eth.accounts.privateKeyToAccount(sendTo);
        
            var txData = {
                "nonce": nonce,
                "maxFeePerGas": this.web3.utils.toHex(Constants.MAXFEEPERGAS),
                "maxPriorityFeePerGas": this.web3.utils.toHex(Constants.MAXPRIORITYFEEPERGAS),
                "gas" : this.web3.utils.toHex(21000),
                "from" : accountFrom.address,
                "to" : addressendTo.address,
                "value": this.web3.utils.toWei(amount),
            }
                
            this.web3.eth.accounts.signTransaction(txData, privateKey)
            .then(signed => {
                this.web3.eth.sendSignedTransaction(signed.rawTransaction!)
                .on('transactionHash', (hash: any) => {
                    logger.info("Transaction sent : " + hash);
                })
                .then((data => {
                    logger.info('Done  .. ' + data.transactionHash);
                    resolve(data.transactionHash);
                }))
                .catch(err =>{
                    logger.error(err);
                    reject(err);
                })
            });
        });
    }
}

export default SimpleTXBuilder;