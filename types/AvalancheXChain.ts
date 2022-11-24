import { AVMAPI, KeyChain } from "@c4tplatform/caminojs/dist/apis/avm";
import { Buffer } from "@c4tplatform/caminojs/dist"

//create type configuration
type AvalancheXChain = {
    xKeyChain : KeyChain,
    xchain: AVMAPI,
    avaxAssetID: string,
    addressStrings :string[],
    xAddresses: Buffer[];
}

//export 
export default AvalancheXChain;