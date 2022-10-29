//import web3
import Web3 from 'web3';
import { ConfigurationType } from '../types/configurationtype';

//create an interface with properties and methods
interface ITransactionBuilder {
    ContractAbi : any;
    Configuration : ConfigurationType;
    buildAndSendTransaction(privateKey : string, contractAddress : string, sendTo : string, amount : string): Promise<string>
    deployContract(privateKey : string, web3 : Web3) : Promise<string>
}

//export the interface
export default ITransactionBuilder;