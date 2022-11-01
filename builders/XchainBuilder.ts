import Web3 from 'web3';
import ITransactionBuilder from './ItransactionBuilder';
import { ConfigurationType } from '../types/configurationtype';
import DataFlow from '../types/dataflowtype';
import { logger } from "../utils/logger";
import { Constants } from '../constants';
import axios from 'axios';
import { Avalanche, BN, Buffer } from "avalanche/dist"
import {
    AVMAPI,
    KeyChain,
    UTXOSet,
    UnsignedTx,
    Tx
} from "avalanche/dist/apis/avm"
import {
    GetBalanceResponse,
    GetUTXOsResponse
} from "avalanche/dist/apis/avm/interfaces"
import { Defaults } from "avalanche/dist/utils"
import {
    PrivateKeyPrefix,
    DefaultLocalGenesisPrivateKey,
    UnixNow
} from "avalanche/dist/utils";



class xChainBuilder {

    ContractAbi: any;
    Configuration: ConfigurationType;
    DataFlow: DataFlow;
    web3: Web3;

    constructor(config: ConfigurationType, web3: Web3, dataFlow: DataFlow) {
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

    public static async buildAndSendTransaction(
        fromTo: string [],
        sendTo: string [],
        avaxAssetIDData: string,
        protocolData: string,
        ipData: string,
        portData: number,
        networkIDData: number,
        privateKey: string
        ): Promise<string> {
        return new Promise(async (resolve, reject) => {

            const ip: string = ipData
            const port: number = portData
            const protocol: string = protocolData
            const networkID: number = networkIDData
            const xBlockchainID: string = "X"
            const avaxAssetID: string = avaxAssetIDData
            const avalanche: Avalanche = new Avalanche(
                ip,
                port,
                protocol,
                networkID,
                xBlockchainID
            )

            let sendToA = [sendTo]

            const xchain: AVMAPI = avalanche.XChain()
            const xKeychain: KeyChain = xchain.keyChain();

            //Import Private Key
            const privKey: string = privateKey;
            xKeychain.importKey(privKey)

            console.log("privKey", privKey);
            
            
            const asOf: BN = UnixNow()
            const threshold: number = 1
            const locktime: BN = new BN(0)
            const memo: Buffer = Buffer.from("AVM utility method buildBaseTx to send AVAX");
            const fee: BN = new BN(1000000);
            console.log("fee : ", fee.toString());

            const getBalanceResponse: GetBalanceResponse = await xchain.getBalance(
                fromTo[0],
                avaxAssetID
            )

            const balance: BN = new BN(getBalanceResponse.balance)
            console.log(balance.toString());

            const avmUTXOResponse: GetUTXOsResponse = await xchain.getUTXOs(fromTo)

            const utxoSet: UTXOSet = avmUTXOResponse.utxos
            const amount: BN = new BN(fee);

            const unsignedTx: UnsignedTx = await xchain.buildBaseTx(
                utxoSet,
                amount,
                avaxAssetID,
                sendTo,
                fromTo,
                sendTo,
                memo,
                asOf,
                locktime,
                threshold
            )

            const tx: Tx = unsignedTx.sign(xKeychain)
            const txid: string = await xchain.issueTx(tx)
            console.log(`Success! TXID: ${txid}`)
        });
    }
}

export default xChainBuilder;