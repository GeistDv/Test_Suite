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

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const ip: string = "127.0.0.1"
const port: number = 45454
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
const xAddressStrings: string[] = xchain.keyChain().getAddressStrings()
const asOf: BN = UnixNow()
const threshold: number = 1
const locktime: BN = new BN(0)
const memo: Buffer = Buffer.from("AVM utility method buildBaseTx to send AVAX");
const fee: BN = new BN(1000000);
console.log("fee : " , fee.toString());

const main = async (): Promise<any> => {
  transactionAvax();
  transactionAvax2();
  transactionAvax3();
}

async function transactionAvax () 
{
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
  console.log(`Success! TXID 1: ${txid}`);
}

async function transactionAvax2 () 
{
  let arrXAdress : string[] = ["X-custom1fsgp3afcqhv2z9uhfft93xk4jzch6muluunwtc"];

  const avmUTXOResponse: GetUTXOsResponse = await xchain.getUTXOs(xAddressStrings[0])

  const utxoSet: UTXOSet = avmUTXOResponse.utxos
  const amount: BN = new BN(fee);

  const unsignedTx: UnsignedTx = await xchain.buildBaseTx(
    utxoSet,
    amount,
    avaxAssetID,
    arrXAdress,
    xAddressStrings,
    arrXAdress,
    memo,
    asOf,
    locktime,
    threshold
  )

  const tx: Tx = unsignedTx.sign(xKeychain)
  const txid: string = await xchain.issueTx(tx)
  console.log(`Success! TXID 2: ${txid}`);
}

async function transactionAvax3 () 
{
  let arrXAdress : string[] = ["X-custom1p240d26cdc3eaph86vwgrheaqvn3qs03gd0wsn"];

  const avmUTXOResponse: GetUTXOsResponse = await xchain.getUTXOs(xAddressStrings[0])

  const utxoSet: UTXOSet = avmUTXOResponse.utxos
  const amount: BN = new BN(fee);

  const unsignedTx: UnsignedTx = await xchain.buildBaseTx(
    utxoSet,
    amount,
    avaxAssetID,
    arrXAdress,
    xAddressStrings,
    xAddressStrings,
    memo,
    asOf,
    locktime,
    threshold
  )

  const tx: Tx = unsignedTx.sign(xKeychain)
  const txid: string = await xchain.issueTx(tx)
  console.log(`Success! TXID 3: ${txid}`);
}

main();