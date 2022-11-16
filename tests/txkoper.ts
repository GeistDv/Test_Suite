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

const ip: string = "santi.camino.network"
const port: number = 443
const protocol: string = "https"
const networkID: number = 1002
const xBlockchainID: string = "X"
const avaxAssetID: string = "brFTMcCq2jnBLzQtGbYwetKW7rRkRhHQqKGWAhkGffp8qqmJh"
const avalanche: Avalanche = new Avalanche(
  ip,
  port,
  protocol,
  networkID,
  xBlockchainID
)
const xchain: AVMAPI = avalanche.XChain()
const xKeychain: KeyChain = xchain.keyChain()

const privKey: string = "PrivateKey-2HVVkvky1FpE5JjtpnmmnenYS11jX8df1emxFHo8ptK6i6eJ7N";
xKeychain.importKey(privKey)
const xAddressStrings: string[] = xchain.keyChain().getAddressStrings();
console.log(xAddressStrings);

const asOf: BN = UnixNow()
const threshold: number = 1
const locktime: BN = new BN(0)
const memo: Buffer = Buffer.from("AVM utility method buildBaseTx to send AVAX");
const fee: BN = new BN(1000000);
console.log("fee : " , fee.toString());

const main = async (): Promise<any> => {
  const getBalanceResponse: GetBalanceResponse = await xchain.getBalance(
    xAddressStrings[0],
    avaxAssetID
  )

  console.log("Real Fee -> ",xchain.getDefaultTxFee());
  

  xchain.setTxFee(new BN(1000000));


  console.log("New Real Fee -> ",xchain.getDefaultTxFee());

  let myAddresses = xchain.keyChain().getAddresses() 
  
  const balance: BN = new BN(getBalanceResponse.balance)
  console.log(balance.toString());

  const avmUTXOResponse: GetUTXOsResponse = await xchain.getUTXOs(xAddressStrings);

  let balanceUtxos = avmUTXOResponse.utxos.getBalance(myAddresses,avaxAssetID);
  console.log("Balance UTXOS -> ",balanceUtxos);

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
  console.log(`Success! TXID: ${txid}`)
}

main();