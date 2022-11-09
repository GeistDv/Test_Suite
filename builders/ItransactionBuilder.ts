//import web3
import Web3 from 'web3';
import { ConfigurationType } from '../types/configurationtype';
import AvalancheXChain from '../types/AvalancheXChain';
import XChainTestWallet from '../utils/XChainTestWallet';

//create an interface with properties and methods
interface ITransactionBuilder {
    ContractAbi : any;
    Configuration : ConfigurationType;
    buildAndSendTransaction(privateKey : string | XChainTestWallet, contractAddress : string, sendTo : string | XChainTestWallet, amount : string | number,avalancheXChain?:AvalancheXChain): Promise<string>
    deployContract(privateKey : string, web3 : Web3) : Promise<string>
}

//export the interface
export default ITransactionBuilder;