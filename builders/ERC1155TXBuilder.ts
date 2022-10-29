import Web3 from 'web3';
import { ConfigurationType } from '../types/configurationtype';
import ITransactionBuilder from './ItransactionBuilder';
import DataFlow from '../types/dataflowtype';
import { Constants } from '../constants';

class ERC1155TXBuilder implements ITransactionBuilder {
    
    ContractAbi : any;
    Configuration : ConfigurationType;
    DataFlow : DataFlow;
    web3 : Web3;

    constructor(Config : ConfigurationType, web3 : Web3, DataFlow : DataFlow) {
        this.ContractAbi = require('../contracts/erc1155.json');
        this.Configuration = Config;
        this.DataFlow = DataFlow;
        this.web3 = web3;
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
                gasPrice : Constants.MAXPRIORITYFEEPERGAS.toString(),
                gas : Constants.MAXFEEPERGAS
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

    async mint(privateKey : string, web3 : Web3, contractAddress : string) : Promise<string>
    {
        return new Promise(async (resolve, reject) => {

            var addressSendTo = web3.eth.accounts.privateKeyToAccount(privateKey);
            var address = web3.eth.accounts.privateKeyToAccount(this.Configuration.private_key_with_funds);
            var contract = new web3.eth.Contract(this.ContractAbi.abi, contractAddress);
            var nonce = await this.web3.eth.getTransactionCount(this.DataFlow.hex_cchain_address);
            
            const data = contract.methods.mint(addressSendTo.address, Constants.NFTID , Constants.NFTAMOUNT, '').encodeABI();
            var txData = {
                nonce:nonce,
                maxFeePerGas: web3.utils.toHex(Constants.MAXFEEPERGAS),
                maxPriorityFeePerGas: web3.utils.toHex(Constants.MAXPRIORITYFEEPERGAS),
                gas : web3.utils.toHex(Constants.GAS),
                from: address.address,
                to: contractAddress,
                value: web3.utils.toHex(0),
                data: data
            };

              web3.eth.accounts.signTransaction(txData, '0x'+ this.Configuration.private_key_with_funds)
              .then(signed => {
                  web3.eth.sendSignedTransaction(signed.rawTransaction!).then((data =>{
                      resolve(data.transactionHash);
                  })).catch(err =>{
                      console.log(err);
                      reject(err)
                  })
              });
        })
    }
    
    async buildAndSendTransaction(
        contractAddress : string, 
        sendTo : string, 
        amount : string): Promise<string> 
    {
        return new Promise(async (resolve, reject) => {
            
            var nonce = await this.web3.eth.getTransactionCount(this.DataFlow.hex_cchain_address);
            var contract = new this.web3.eth.Contract(this.ContractAbi.abi, contractAddress);
            const data = contract.methods.transfer(sendTo, amount).encodeABI();
            
            var txData = {
              nonce:nonce,
              maxFeePerGas: this.web3.utils.toHex(Constants.MAXFEEPERGAS),
              maxPriorityFeePerGas: this.web3.utils.toHex(Constants.MAXPRIORITYFEEPERGAS),
              gas : this.web3.utils.toHex(1000000),
              from: this.DataFlow.hex_cchain_address,
              to: contractAddress,
              value: this.web3.utils.toHex(0),
              data: data
            };

            this.web3.eth.accounts.signTransaction(txData, '0x'+ this.DataFlow.hexPrivateKey)
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

export default ERC1155TXBuilder;