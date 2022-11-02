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
import AvalancheXChain from '../types/AvalancheXChain';

import { InitialStates, SECPTransferOutput } from "avalanche/dist/apis/avm"

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
        fromAddress: any[],
        sendAddress: string[],
        avalancheXChain: AvalancheXChain,
        amountToSend: number
    ): Promise<string> {
        return new Promise(async (resolve, reject) => {

            console.log("sendAddress",sendAddress);

            const asOf: BN = UnixNow();
            const threshold: number = 1;
            const locktime: BN = new BN(0);
            const memo: Buffer = Buffer.from("AVM utility method buildBaseTx to send AVAX");

            const bufferAddress = Buffer.from(fromAddress[0]);

            //Prepare UTXOs
            const secpOutput = new SECPTransferOutput(new BN(amountToSend), [bufferAddress], locktime, threshold);
            const initialState = new InitialStates()
            initialState.addOutput(secpOutput)

            const avmUTXOResponse: GetUTXOsResponse = await avalancheXChain.xchain.getUTXOs(fromAddress);

            const utxoSet: UTXOSet = avmUTXOResponse.utxos;
            
            const balance = utxoSet.getBalance(fromAddress[0], avalancheXChain.avaxAssetID);

            const amount: BN = new BN(amountToSend);

            const unsignedTx: UnsignedTx = await avalancheXChain.xchain.buildBaseTx(
                utxoSet,
                amount,
                avalancheXChain.avaxAssetID,
                sendAddress,
                fromAddress,
                fromAddress,
                memo,
                asOf,
                locktime,
                threshold
            );

            const tx: Tx = unsignedTx.sign(avalancheXChain.xKeyChain)
            const txid: string = await avalancheXChain.xchain.issueTx(tx);

            let status: string = "";

            //Temporal Solution
            while (status.toUpperCase() != "ACCEPTED") {
                status = await avalancheXChain.xchain.getTxStatus(txid);//Accepted
            }

            resolve(txid);
        });
    }

    public static async getBalanceAddress(address: string, avalancheXChain: AvalancheXChain) {
        const getBalanceResponse: GetBalanceResponse = await avalancheXChain.xchain.getBalance(
            address,
            avalancheXChain.avaxAssetID
        );
        
        const balance: BN = new BN(getBalanceResponse.balance);
        return balance;
    }

}

export default xChainBuilder;