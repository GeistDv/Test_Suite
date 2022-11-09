import Web3 from 'web3';
import ITransactionBuilder from './ItransactionBuilder';
import { ConfigurationType } from '../types/configurationtype';
import DataFlow from '../types/dataflowtype';
import XChainTestWallet from '../utils/XChainTestWallet';
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

class xChainBuilder implements ITransactionBuilder {

    ContractAbi: any;
    Configuration: ConfigurationType;
    DataFlow: DataFlow;
    web3: Web3;
    PathprivateKeys: any;

    constructor(Config: ConfigurationType, web3: Web3, dataFlow: DataFlow) {
        this.Configuration = Config;
        this.web3 = web3;
        this.DataFlow = dataFlow;
    }

    deployContract(privateKey: string, web3: Web3): Promise<string> {
        return new Promise(async (resolve, reject) => {
            resolve("");
        });
    }

    public async buildAndSendTransaction()
    {
        return "";
    }

    public static async buildAndSendTransactionXChain(
        privateKey: XChainTestWallet,
        contractAddress: string,
        sendTo: XChainTestWallet,
        amountToSend: string,
        avalancheXChain: AvalancheXChain
    ): Promise<string> {
        return new Promise(async (resolve, reject) => {

            const avmUTXOResponse: GetUTXOsResponse = await avalancheXChain.xchain.getUTXOs([privateKey.xChainAddress]);

            const utxoSet: UTXOSet = avmUTXOResponse.utxos;
            const asOf: BN = UnixNow();
            const threshold: number = 1;
            const locktime: BN = new BN(0);
            const memo: Buffer = Buffer.from("AVM utility method buildBaseTx to send AVAX");
            const amount: BN = new BN(amountToSend);

            const unsignedTx: UnsignedTx = await avalancheXChain.xchain.buildBaseTx(
                utxoSet,
                amount,
                avalancheXChain.avaxAssetID,
                [sendTo.xChainAddress],
                [privateKey.xChainAddress],
                [privateKey.xChainAddress],
                memo,
                asOf,
                locktime,
                threshold
            );

            const tx: Tx = unsignedTx.sign(avalancheXChain.xKeyChain);

            const txid: string = await avalancheXChain.xchain.issueTx(tx);
            let status: string = "";

            //Temporal Solution
            while (status.toUpperCase() != "ACCEPTED" && status.toUpperCase() != "REJECTED") {
                status = await avalancheXChain.xchain.getTxStatus(txid);//Accepted
            }
            
            resolve(txid);
        });
    }

}

export default xChainBuilder;