import Web3 from 'web3';
import ITransactionBuilder from '../interfaces/ItransactionBuilder';
import { ConfigurationType } from '../types/configurationtype';
import DataFlow from '../types/dataflowtype';
import XChainTestWallet from '../utils/XChainTestWallet';
import { errorLogger, logger } from "../utils/logger";
import { Constants } from '../constants';
import axios from 'axios';
import { Avalanche, BN, Buffer } from "@c4tplatform/caminojs/dist"
import {
    AVMAPI,
    KeyChain,
    UTXOSet,
    UnsignedTx,
    Tx
} from "@c4tplatform/caminojs/dist/apis/avm"
import {
    GetBalanceResponse,
    GetUTXOsResponse
} from "@c4tplatform/caminojs/dist/apis/avm/interfaces"
//import { Defaults } from "@c4tplatform/caminojs/dist/utils"
import {
    PrivateKeyPrefix,
    DefaultLocalGenesisPrivateKey,
    UnixNow
} from "@c4tplatform/caminojs/dist/utils";
import AvalancheXChain from '../types/AvalancheXChain';


//import { InitialStates, SECPTransferOutput } from "@c4tplatform/caminojs/dist/apis/avm"

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


    public async buildAndSendTransaction(
        privateKey: XChainTestWallet,
        contractAddress: string,
        sendTo: XChainTestWallet,
        amountToSend: number,
        avalancheXChain: AvalancheXChain
    ): Promise<string> {
        return new Promise(async (resolve, reject) => {

            let limitReadingSpendableUtxos = 100;
            let isSpendableUtxos = false;
            while (!isSpendableUtxos) {
                let balance = await avalancheXChain.xchain.getBalance(privateKey.xChainAddress, avalancheXChain.avaxAssetID);
                if (balance.utxoIDs.length <= 0) {
                    isSpendableUtxos = false;
                    limitReadingSpendableUtxos++;
                    if(limitReadingSpendableUtxos >= 20)
                    {
                        console.log("Spendable Utxos Failed");
                        errorLogger.error("Spendable Utxos Failed");
                        isSpendableUtxos = true;
                        resolve("0");
                    }
                }
                else {
                    isSpendableUtxos = true;
                }
            }


            const avmUTXOResponse: GetUTXOsResponse = await avalancheXChain.xchain.getUTXOs([privateKey.xChainAddress]);

            const utxoSet: UTXOSet = avmUTXOResponse.utxos;
            const asOf: BN = UnixNow();
            const threshold: number = 1;
            const locktime: BN = new BN(0);
            const memo: Buffer = Buffer.from("AVM utility method buildBaseTx to send CAM");
            const amount: BN = new BN(amountToSend);
            let numFetched = avmUTXOResponse.numFetched;

            const balance = await privateKey.avalancheXChain.xchain.getBalance(privateKey.xChainAddress, privateKey.avalancheXChain.avaxAssetID);

            console.log("______________________________________________");
            console.log("Balance:", balance.balance);
            console.log("Address From:", privateKey.xChainAddress);
            console.log("Address to:", sendTo.xChainAddress);
            console.log("Amount:", Web3.utils.toWei(Constants.AMOUNT_TO_TRANSFER, 'gwei'));
            console.log("num fetched", numFetched)

            //Catch Low Balance
            if (balance.balance < (amountToSend + 1000000000)) {
                errorLogger.error({
                    addressFrom: privateKey.xChainAddress,
                    addressTo: sendTo.xChainAddress,
                    balance: balance.balance,
                    privateKey: privateKey.privateKey,
                    message: "Insufficient funds to complete this transaction",
                    amount: (amountToSend),
                    fee: 1000000000,
                    amountAndFee: amountToSend + 1000000000
                });

                reject("Insufficient funds to complete this transaction");
            };
            var tx: Tx;
            try {
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

                tx = unsignedTx.sign(avalancheXChain.xKeyChain);
                const txid: string = await avalancheXChain.xchain.issueTx(tx);
                let status: string = "";

                //Temporal Solution
                let limitReadingProcessTx = 100;
                while (status.toUpperCase() != "ACCEPTED" && status.toUpperCase() != "REJECTED") {
                    status = await avalancheXChain.xchain.getTxStatus(txid);//Accepted
                    limitReadingProcessTx++;

                    if(limitReadingProcessTx >= 100)
                    {
                        console.log("Transactiont never Accepted or Rejected");
                        errorLogger.error("Transactiont never Accepted or Rejected");
                        resolve("0");
                    }
                }


                resolve(txid);

            }
            catch (e) {
                console.log("failed sign transaction");
                console.log(e);
                errorLogger.error(e);
                resolve("0")
            }

        });
    }

}

export default xChainBuilder;