//import web3
import Web3 from 'web3';
import { ConfigurationType } from '../types/configurationtype';
import AvalancheXChain from '../types/AvalancheXChain';

//create an interface with properties and methods
interface ITransactionBuilder {
    ContractAbi : any;
    Configuration : ConfigurationType;
    buildAndSendTransaction(privateKey : string, contractAddress : string, sendTo : string, amount : string,avalancheXChain?:AvalancheXChain): Promise<string>
    deployContract(privateKey : string, web3 : Web3) : Promise<string>
}

//export the interface
export default ITransactionBuilder;