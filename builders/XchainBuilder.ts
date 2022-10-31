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
} from "avalanche/dist/utils"

class XchainBuilder implements ITransactionBuilder {

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

    private async GetAssetID(): Promise<string> {

        var data = JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1,
            "method": "platform.getStakingAssetID",
            "params": {}
        });

        var config = {
            method: 'post',
            url: this.Configuration.rpc + '/ext/bc/P',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        var reponse = await axios(config)
        return reponse.data.result.assetID;
    }

    private async getNetworkID(): Promise<number> {
        return new Promise((resolve, reject) => {
            this.web3.eth.net.getId().then((id) => {
                resolve(id);
            })
        });
    }
    async buildAndSendTransaction(
        privateKey: string,
        contractAddress: string,
        sendTo: string,
        amount: string): Promise<string> {

        let dataConfigXChain = {
            avaxAssetID: await this.GetAssetID(),
            networkID: await this.getNetworkID()
        }

        return new Promise(async (resolve, reject) => {
            const ip: string = "127.0.0.1"
            //const port: number = 443
            const port: number = 45454
            const protocol: string = "http"
            const networkID: number = dataConfigXChain.networkID
            const xBlockchainID: string = "X"
            const avaxAssetID: string = dataConfigXChain.avaxAssetID
            const avalanche: Avalanche = new Avalanche(
                ip,
                port,
                protocol,
                networkID,
                xBlockchainID
            )
            const xchain: AVMAPI = avalanche.XChain()
            const xKeychain: KeyChain = xchain.keyChain()

            const privKey: string = privateKey;
            xKeychain.importKey(privKey)
            const xAddressStrings: string[] = xchain.keyChain().getAddressStrings()
            const asOf: BN = UnixNow()
            const threshold: number = 1
            const locktime: BN = new BN(0)
            const memo: Buffer = Buffer.from("AVM utility method buildBaseTx to send AVAX");
            const fee: BN = new BN(1000000);

            const getBalanceResponse: GetBalanceResponse = await xchain.getBalance(
                xAddressStrings[0],
                avaxAssetID
            )

            const balance: BN = new BN(getBalanceResponse.balance)
            console.log(balance.toString());

            const avmUTXOResponse: GetUTXOsResponse = await xchain.getUTXOs(xAddressStrings)

            const utxoSet: UTXOSet = avmUTXOResponse.utxos
            const amount: BN = new BN(fee);

            const unsignedTx: UnsignedTx = await xchain.buildBaseTx(
                utxoSet,
                amount,
                avaxAssetID,
                xAddressStrings,
                xAddressStrings,
                xAddressStrings,
                memo,
                asOf,
                locktime,
                threshold
            )

            const tx: Tx = unsignedTx.sign(xKeychain)
            const txid: string = await xchain.issueTx(tx)

            console.log(`Success! TXID: ${txid}`);
            resolve(txid);
        });
    }
}

export default XchainBuilder;