import Web3 from 'web3';
import { Constants } from '../constants';
import { ConfigurationType } from '../types/configurationtype';
import DataFlow from '../types/dataflowtype';
import ITransactionBuilder from './ItransactionBuilder';


class testbuilderErc20 implements ITransactionBuilder {

    ContractAbi: any;
    Configuration: ConfigurationType;
    contractAddress: string;
    DataFlow: DataFlow;
    web3: Web3;
    PathprivateKeys: any;

    constructor(Config: ConfigurationType, web3: Web3, dataFlow: DataFlow) {
        this.ContractAbi = require('../contracts/erc20.json');
        this.Configuration = Config;
        this.web3 = web3;
        this.DataFlow = dataFlow;
        this.PathprivateKeys = this.PathprivateKeys;
        this.contractAddress = "";
    }

    public async deployContract(privateKey: string, web3: Web3): Promise<string> {
        return new Promise(async (resolve, reject) => {
            console.log('privateKey principal deploy contract :', privateKey);
            let account = web3.eth.accounts.privateKeyToAccount(privateKey);
            web3.eth.accounts.wallet.add(privateKey);
            console.log("Deploying contract...");
            let contract = new web3.eth.Contract(this.ContractAbi.abi);

            await contract.deploy({
                data: this.ContractAbi.data.bytecode.object,
                arguments: []
            })
                .send({
                    from: account.address,
                    gasPrice: "50000000000",
                    gas: 8000000
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


    public async mint(privateKey: string, web3: Web3, addressTomint: string, nonce: number): Promise<string> {
        return new Promise(async (resolve, reject) => {
            var addressSendTo = web3.eth.accounts.privateKeyToAccount(addressTomint);
            var address = web3.eth.accounts.privateKeyToAccount(privateKey);
            var contract = new web3.eth.Contract(this.ContractAbi.abi, this.contractAddress);
            console.log ("contract address before make mint transaction",this.contractAddress)
            const data = contract.methods.mint(addressSendTo.address, "100000000").encodeABI();
            var txData = {
                nonce: nonce,
                maxFeePerGas: web3.utils.toHex(Constants.MAXFEEPERGAS),
                maxPriorityFeePerGas: web3.utils.toHex(Constants.MAXPRIORITYFEEPERGAS),
                from: address.address,
                gasLimit : web3.utils.toHex(535960),
                to: this.contractAddress,
                value: web3.utils.toHex(0),
                data: data
            };

            web3.eth.accounts.signTransaction(txData, privateKey)
                .then(signed => {
                    web3.eth.sendSignedTransaction(signed.rawTransaction!).then((data => {
                        resolve(data.transactionHash);
                    })).catch(err => {
                        console.log(err);
                        reject(err)
                    })
                });
        })
    }

    async buildAndSendTransaction(privateKey: string, contractAddress: string, sendTo: string, amount: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            
            var nonce = await this.web3.eth.getTransactionCount(this.DataFlow.hex_cchain_address);
            var contract = new this.web3.eth.Contract(this.ContractAbi.abi, contractAddress);
            const data = contract.methods.transfer(sendTo, amount).encodeABI();
            
            var txData = {
                nonce: nonce,
                maxFeePerGas: this.web3.utils.toHex(Constants.MAXFEEPERGAS),
                maxPriorityFeePerGas: this.web3.utils.toHex(Constants.MAXPRIORITYFEEPERGAS),
                gas: this.web3.utils.toHex(Constants.GAS),
                from: this.DataFlow.hex_cchain_address,
                to: sendTo,
                value: this.web3.utils.toHex(0),
                data: data
            };

            this.web3.eth.accounts.signTransaction(txData, privateKey)
                .then(signed => {
                    this.web3.eth.sendSignedTransaction(signed.rawTransaction!).then((data => {
                        resolve(data.transactionHash);
                    })).catch(err => {
                        console.log(err);
                        reject(err)
                    })
                });
        })
    }
}

export default testbuilderErc20;