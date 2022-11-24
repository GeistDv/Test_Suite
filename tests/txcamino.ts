import { Avalanche, BN } from "@c4tplatform/caminojs/dist"
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
import {
  PrivateKeyPrefix,
  DefaultLocalGenesisPrivateKey,
  UnixNow
} from "@c4tplatform/caminojs/dist/utils"


//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const ip: string = "santi.camino.network"
const port: number = 443
const protocol: string = "https"
const networkID: number = 1002
const privKey: string = "PrivateKey-2Tt165kZ67JD9A6rEZn3QrEYDpzBtF9mxcfYRZatT8gcoUDLVd";


const asOf: BN = UnixNow()
const threshold: number = 1
const locktime: BN = new BN(0)
const memo: Buffer = Buffer.from("AVM utility method buildBaseTx to send AVAX");

const avalanche: Avalanche = new Avalanche(
  ip,
  port,
  protocol,
  networkID,
);

var xchain: AVMAPI;
var xKeychain: KeyChain;
var xAddresses: Buffer[];
var xAddressStrings: string[];
var avaxAssetID: string;
var blockchainID: string;
var fee: BN;
var avaxAssetIDBuf: Buffer;

const InitAvalanche = async () => {
  await avalanche.fetchNetworkSettings()
  xchain = avalanche.XChain()
  xKeychain= xchain.keyChain()
  xKeychain.importKey(privKey)
  xAddresses= xchain.keyChain().getAddresses()
  xAddressStrings= xchain.keyChain().getAddressStrings()
  avaxAssetID = avalanche.getNetwork().X.avaxAssetID
  blockchainID = avalanche.getNetwork().X.blockchainID
  fee= xchain.getDefaultTxFee()
}

const main = async (): Promise<any> => {
  await InitAvalanche();
  const getBalanceResponse: GetBalanceResponse = await xchain.getBalance(
    xAddressStrings[0],
    avaxAssetID
  )
  console.log("fee : " , fee);

  let myAddresses = xchain.keyChain().getAddresses() 
  
  const balance: BN = new BN(getBalanceResponse.balance)
  console.log("balance",balance.toString());

  const avmUTXOResponse: GetUTXOsResponse = await xchain.getUTXOs([xAddressStrings[0]]);

  let balanceUtxos = avmUTXOResponse.utxos.getBalance(myAddresses,avaxAssetID);
  console.log("Balance UTXOS -> ",balanceUtxos);

  const utxoSet: UTXOSet = avmUTXOResponse.utxos
  const amount: BN = new BN(fee);

  const unsignedTx: UnsignedTx = await xchain.buildBaseTx(
    utxoSet,
    amount,
    avaxAssetID,
    [xAddressStrings[0]],
    [xAddressStrings[0]],
    [xAddressStrings[0]],
    memo,
    asOf,
    locktime,
    threshold
  )

  const tx: Tx = unsignedTx.sign(xKeychain)
  const txid: string = await xchain.issueTx(tx)
  console.log(`Success! TXID: ${txid}`)
}

main();