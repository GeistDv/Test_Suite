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
        fromAddress: string [],
        sendAddress: string [],
        avalancheXChain: AvalancheXChain
        ): Promise<string> {
        return new Promise(async (resolve, reject) => {
            
            const asOf: BN = UnixNow()
            const threshold: number = 1
            const locktime: BN = new BN(0)
            const memo: Buffer = Buffer.from("AVM utility method buildBaseTx to send AVAX");
            const fee: BN = new BN(1000000);

            const avmUTXOResponse: GetUTXOsResponse = await avalancheXChain.xchain.getUTXOs(fromAddress)
            const utxoSet: UTXOSet = avmUTXOResponse.utxos
            const amount: BN = new BN(1);

            let balanceFrom = await this.getBalanceAddress(fromAddress[0], avalancheXChain);
            console.log("Balance From", balanceFrom);

            const unsignedTx: UnsignedTx = await avalancheXChain.xchain.buildBaseTx(
                utxoSet,
                amount,
                avalancheXChain.avaxAssetID,
                sendAddress,
                fromAddress,
                sendAddress,
                memo,
                asOf,
                locktime,
                threshold
            )

            const tx: Tx = unsignedTx.sign(avalancheXChain.xKeyChain)
            const txid: string = await avalancheXChain.xchain.issueTx(tx);

            let balanceTo = await this.getBalanceAddress(sendAddress[0], avalancheXChain);
            console.log("Balance To", balanceTo);
            
            resolve(txid);
        });
    }

    private static async getBalanceAddress (address: string, avalancheXChain: AvalancheXChain) 
    {
        const getBalanceResponse: GetBalanceResponse = await avalancheXChain.xchain.getBalance(
            address,
            avalancheXChain.avaxAssetID
        );

        const balance: BN = new BN(getBalanceResponse.balance);
        return balance;
    }

}

export default xChainBuilder;