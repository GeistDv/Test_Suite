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

const ip: string = "api.avax-test.network"
//const ip: string = "kopernikus.camino.foundation"
const port: number = 443
const protocol: string = "https"
const networkID: number = 5
const xBlockchainID: string = "X"
const avaxAssetID: string = "U8iRqJoiJm8xZHAacmvYyZVwqQx6uDNtQeP3CQ6fcgQk3JqnK"
const avalanche: Avalanche = new Avalanche(
  ip,
  port,
  protocol,
  networkID,
  xBlockchainID
)
const xchain: AVMAPI = avalanche.XChain()
const xKeychain: KeyChain = xchain.keyChain()

const privKey: string = "PrivateKey-29yThsRWB1Xw7zgvtSgpTy4Nm7NjEiQKLMm8YRtJWMdKRVvmpE";
xKeychain.importKey(privKey)
const xAddressStrings: string[] = xchain.keyChain().getAddressStrings()
const asOf: BN = UnixNow()
const threshold: number = 1
const locktime: BN = new BN(0)
const memo: Buffer = Buffer.from("AVM utility method buildBaseTx to send AVAX");
const fee: BN = xchain.getDefaultTxFee()
console.log("fee : " , fee.toString());

const main = async (): Promise<any> => {
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
  console.log(`Success! TXID: ${txid}`)
}

main();