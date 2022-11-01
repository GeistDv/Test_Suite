import { Avalanche } from "avalanche/dist";
import { AVMAPI, KeyChain } from "avalanche/dist/apis/avm";
import AvalancheXChain from "../types/AvalancheXChain";

export async function getXKeyChain(ipData: string, portData: number, protocolData: string, networkIDData: number, privateKey: string, avaxAssetIDData: string) : Promise<AvalancheXChain> {
    const ip: string = ipData
    const port: number = portData
    const protocol: string = protocolData
    const networkID: number = networkIDData
    const xBlockchainID: string = "X"
    const avalanche: Avalanche = new Avalanche(
        ip,
        port,
        protocol,
        networkID,
        xBlockchainID
    )

    const xchain: AVMAPI = avalanche.XChain()
    const xKeychain: KeyChain = xchain.keyChain();

    const privKey: string = privateKey;
    xKeychain.importKey(privKey)

    const avaxAssetID: string = avaxAssetIDData;

    let avalancheXChain: AvalancheXChain = {
        xchain : xchain,
        xKeyChain : xKeychain,
        avaxAssetID: avaxAssetID
    } 

    return avalancheXChain;
}