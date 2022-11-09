import Web3 from "web3";
import { BinTools, Buffer } from "avalanche";
import { logger } from "./logger";
import axios from "axios";
import { Constants } from "../constants";
import { ConfigurationType } from "../types/configurationtype";
import xChainBuilder from "../builders/XchainBuilder";
import NetworkRunner from "../network-runner/NetworkRunner";
import AvalancheXChain from "../types/AvalancheXChain";
import Utils from "./utils";
import { AVMAPI, KeyChain } from "avalanche/dist/apis/avm";
import { getXKeyChain } from './configAvalanche';

class XChainTestWallet {

    xChainAddress: string = "";
    privateKey: string = "";
    avalancheXChain : AvalancheXChain;

    constructor(xChainAddress: string, privateKey: string, avalancheXChain : AvalancheXChain) {
        this.xChainAddress = xChainAddress;
        this.privateKey = privateKey;
        this.avalancheXChain = avalancheXChain;
    }

    public static async importKeyAndCreateWallet(
        web3: Web3,
        configurationType: ConfigurationType,
        url: URL,
        protocolRPC: string,
        networkID: number,
        assetID: string
    ) {
        let privateKey = this.generatePrivateKey(web3);
        let xAddress: string = await this.ImportKeyAVM(privateKey, configurationType);
        let avalancheXChain = await getXKeyChain(url.hostname, parseInt(url.port), protocolRPC, networkID, privateKey, assetID);
        let xChain = new XChainTestWallet(xAddress, privateKey, avalancheXChain);
        return xChain;
    }

    public static generatePrivateKey(web3: Web3) {
        let accountCchain = web3.eth.accounts.create(web3.utils.randomHex(32));
        let addressPrivateKey = accountCchain.privateKey.substring(2);
        let privateKey = this.convertHexPkToCB58(addressPrivateKey);
        return privateKey;
    }

    private static convertHexPkToCB58(hexPrivKey: string): string {
        let bintools: BinTools = BinTools.getInstance();
        let buf: Buffer = Buffer.from(hexPrivKey, 'hex');
        let encoded: string = `PrivateKey-${bintools.cb58Encode(buf)}`;
        return encoded;
    }

    private static async ImportKeyAVM(cb58PrivateKey: string, config: ConfigurationType) {
        var data = JSON.stringify(
            {
                "jsonrpc": "2.0",
                "id": 1,
                "method": "avm.importKey",
                "params": {
                    "username": Constants.KEYSTORE_USER,
                    "password": Constants.KEYSTORE_PASSWORD,
                    "privateKey": cb58PrivateKey
                }
            }
        );

        var request = {
            method: 'post',
            url: config.rpc_keystore + '/ext/bc/X',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        let resultData: any = await axios(request);
        return resultData.data.result.address.toString();
    }
}

export default XChainTestWallet;