import Web3 from "web3";
import { BinTools, Buffer } from "avalanche";
import { logger } from "./logger";
import axios from "axios";
import { Constants } from "../constants";
import { ConfigurationType } from "../types/configurationtype";

class XChainTestWallet {

    privateKey: string = "";
    xChainAddress: string = "";
    web3: Web3;
    config: ConfigurationType;

    constructor(web3: Web3, config: ConfigurationType) {
        this.config = config;
        this.web3 = web3;
    }

    public async generateAccount() {
        let accountCchain = await this.web3.eth.accounts.create(this.web3.utils.randomHex(32));
        let addressPrivateKey = accountCchain.privateKey.substring(2);
        this.privateKey = this.convertHexPkToCB58(addressPrivateKey);
        this.xChainAddress = await this.ImportKeyAVM(this.privateKey);
    }

    private convertHexPkToCB58(hexPrivKey: string): string {
        let bintools: BinTools = BinTools.getInstance();
        let buf: Buffer = Buffer.from(hexPrivKey, 'hex');
        let encoded: string = `PrivateKey-${bintools.cb58Encode(buf)}`;
        console.log(encoded);
        return encoded;
    }

    private async ImportKeyAVM(cb58PrivateKey: string): Promise<string> {

        return new Promise(async (resolve, reject) => {
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
                url: this.config.rpc_keystore + '/ext/bc/X',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(request).then(function (response) {
                resolve(response.data.result.address);
            }).catch(function (error) {
                reject(false);
            });
        });
    }
}

export default XChainTestWallet;