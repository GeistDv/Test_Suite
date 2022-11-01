import { AVMAPI, KeyChain } from "avalanche/dist/apis/avm";

//create type configuration
type AvalancheXChain = {
    xKeyChain : KeyChain,
    xchain: AVMAPI,
    avaxAssetID: string
}

//export 
export default AvalancheXChain;