import Web3 from "web3";
import { BinTools, Buffer } from "@c4tplatform/caminojs";
import { ConfigurationType } from "../types/configurationtype";
import AvalancheXChain from "../types/AvalancheXChain";
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
        assetID: string,
        blockchainID: string
    ) {
        let privateKey = this.generatePrivateKey(web3);
        let avalancheXChain = await getXKeyChain(url.hostname, parseInt(url.port), protocolRPC, networkID, privateKey, assetID, blockchainID);
        let xChain = new XChainTestWallet(avalancheXChain.addressStrings[0], privateKey, avalancheXChain);
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
}

export default XChainTestWallet;