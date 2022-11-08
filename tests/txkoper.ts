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
import Utils from '../utils/utils';
import PQueue from 'p-queue'

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const ip: string = "127.0.0.1"
const port: number = 16815
const protocol: string = "http"
const networkID: number = 1337
const xBlockchainID: string = "X"
const avaxAssetID: string = "BUuypiq2wyuLMvyhzFXcPyxPMCgSp7eeDohhQRqTChoBjKziC"
const avalanche: Avalanche = new Avalanche(
  ip,
  port,
  protocol,
  networkID,
  xBlockchainID
)
const xchain: AVMAPI = avalanche.XChain()
const xKeychain: KeyChain = xchain.keyChain()

const privKey: string = "PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN";

xKeychain.importKey(privKey)
//const xAddressStrings: string[] = xchain.keyChain().getAddressStrings()
const asOf: BN = UnixNow()
const threshold: number = 1
const locktime: BN = new BN(0)
const memo: Buffer = Buffer.from("AVM utility method buildBaseTx to send AVAX");
const fee: BN = new BN(1000000);


const addressFromString = "X-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p";

console.log("fee : ", fee.toString());



const main = async (): Promise<any> => {
  const queue = new PQueue({concurrency: 1});
  
  await queue.addAll([
    () => {transactionAvax("X-custom19007pa4qqsdp3acehx9eqx592k9689qu0508lp")},
    () => {transactionAvax("X-custom1096zhjr30gzmhms5qun68l78ra6w7nynxcljdu")},
    () => {transactionAvax("X-custom1prhks48n8w8ua66erfsn77jxwg5cj4ml6t8x0w")},
  ]);
}

async function transactionAvax(sendTo: string) {
  
  let verifyUtxo : any[] = await Utils.getBalanceAndUtxosID(addressFromString, avaxAssetID);

  console.log("verifyUtxo",verifyUtxo);

  const getBalanceResponse: GetBalanceResponse = await xchain.getBalance(
    addressFromString,
    avaxAssetID
  )

  const balance: BN = new BN(getBalanceResponse.balance)
  console.log(balance.toString());

  const avmUTXOResponse: GetUTXOsResponse = await xchain.getUTXOs(addressFromString);

  const utxoSet: UTXOSet = avmUTXOResponse.utxos
  const amount: BN = new BN(2000000);

  const unsignedTx: UnsignedTx = await xchain.buildBaseTx(
    utxoSet,
    amount,
    avaxAssetID,
    [
      "X-custom19007pa4qqsdp3acehx9eqx592k9689qu0508lp",
    ],
    [addressFromString],
    [
      addressFromString
    ],
    memo,
    asOf,
    locktime,
    threshold
  )

  
  const tx: Tx = unsignedTx.sign(xKeychain)
  const txid: string = await xchain.issueTx(tx)
  console.log(`Success! TXID 1: ${txid}`);

  let changedUTXOS = false;

  while(!changedUTXOS) 
  {
    let newUtxos : any[] = [];
    let verifyUtxo2 : any[] = await Utils.getBalanceAndUtxosID(addressFromString, avaxAssetID);
    for(let u = 0; u < verifyUtxo2.length; u++)
    {
      console.log("utxo -> ",verifyUtxo2[u].txID)
      if(verifyUtxo.some((ut) => ut.txID == verifyUtxo2[u].txID))
      {
        changedUTXOS = false;
      }
    }
    changedUTXOS = true;
  }
}

main();