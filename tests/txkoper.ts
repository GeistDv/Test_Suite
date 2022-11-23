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
const xBlockchainID: string = "BYyUTdNfkiFC2F9QUnyC16UEruBqrfDCnoestUo7FP9WMGPxs"
const avaxAssetID: string = "2qf8NL6N4L1kixaFMhjp38C9nmwtnUZK5YZDyKmBsZQCvQhwpa"
const avalanche: Avalanche = new Avalanche(
  ip,
  port,
  protocol,
  networkID,
  xBlockchainID
);


const xchain: AVMAPI = avalanche.XChain()
const xKeychain: KeyChain = xchain.keyChain()

const privKey: string = "PrivateKey-nJZCiwy7vetYYS8ePRJsi5g13HS99U6L3kG474sXpKpPwUSjE";
xKeychain.importKey(privKey)

const asOf: BN = UnixNow()
const threshold: number = 1
const locktime: BN = new BN(0)
const memo: Buffer = Buffer.from("AVM utility method buildBaseTx to send AVAX");
const fee: BN = new BN(1000000);
console.log("fee : " , fee.toString());

let addressFrom = "BYyUTdNfkiFC2F9QUnyC16UEruBqrfDCnoestUo7FP9WMGPxs-kopernikus1ymmeefawm4eeq8ks0fcmly6tr2edq3gtuej7vq";
let addressTo = "BYyUTdNfkiFC2F9QUnyC16UEruBqrfDCnoestUo7FP9WMGPxs-kopernikus1hrgjfx0cwznjqme57kt53zlpuvq7f78p0m0yv8";

const main = async (): Promise<any> => {
  const getBalanceResponse: GetBalanceResponse = await xchain.getBalance(
    addressFrom,
    avaxAssetID
  )

  console.log("Real Fee -> ",xchain.getDefaultTxFee());
  

  xchain.setTxFee(new BN(1000000));


  console.log("New Real Fee -> ",xchain.getDefaultTxFee());

  let myAddresses = xchain.keyChain().getAddresses() 
  
  const balance: BN = new BN(getBalanceResponse.balance)
  console.log(balance.toString());

  const avmUTXOResponse: GetUTXOsResponse = await xchain.getUTXOs([addressFrom]);

  let balanceUtxos = avmUTXOResponse.utxos.getBalance(myAddresses,avaxAssetID);
  console.log("Balance UTXOS -> ",balanceUtxos);

  const utxoSet: UTXOSet = avmUTXOResponse.utxos
  const amount: BN = new BN(fee);

  const unsignedTx: UnsignedTx = await xchain.buildBaseTx(
    utxoSet,
    amount,
    avaxAssetID,
    [addressTo],
    [addressFrom],
    [addressFrom],
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