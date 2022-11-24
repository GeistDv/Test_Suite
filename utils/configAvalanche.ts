import { Avalanche,BN } from "@c4tplatform/caminojs/dist";
import { AVMAPI, KeyChain } from "@c4tplatform/caminojs/dist/apis/avm";
import AvalancheXChain from "../types/AvalancheXChain";

export async function getXKeyChain(
    ipData: string,
    portData: number,
    protocolData: string,
    networkIDData: number,
    privateKey: string,
    avaxAssetIDData: string,
    blockchainID: string) : Promise<AvalancheXChain> {
    const ip: string = ipData
    const port: number = portData
    const protocol: string = protocolData
    const networkID: number = networkIDData
    const xBlockchainID: string = blockchainID
    const avalanche: Avalanche = new Avalanche(
        ip,
        port,
        protocol,
        networkID
    );
    await avalanche.fetchNetworkSettings();
    const xchain: AVMAPI = avalanche.XChain();

    //Fee Transactions
    xchain.setTxFee(new BN(1000000));
    var addressStrings : string[];
    var xAddresses: Buffer[];

    const xKeychain: KeyChain = xchain.keyChain();

    const privKey: string = privateKey;
    xKeychain.importKey(privKey)
    addressStrings =xKeychain.getAddressStrings()
    xAddresses= xchain.keyChain().getAddresses()
    // console.log(addressStrings)

    const avaxAssetID: string = avaxAssetIDData;

    let avalancheXChain: AvalancheXChain = {
        xchain : xchain,
        xKeyChain : xKeychain,
        avaxAssetID: avaxAssetID,
        addressStrings: addressStrings,
        xAddresses: xAddresses
    } 

    return avalancheXChain;
}