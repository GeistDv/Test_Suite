import { StringLiteral } from "typescript";

type SimpleConfigurationType =
{
    test_type: string;
    enable_kubectl_measurements : boolean;
    enable_gdocs_insertion : boolean;
    sheet_name : string;
}

//create type configuration that includes SimpleConfigurationType
type ConfigurationTypeForCompleteTest = SimpleConfigurationType & {
    rpc : string;
    rpc_keystore : string;
}

type ConfigurationType = ConfigurationTypeForCompleteTest & {
    private_key_with_funds : string;
}

//export 
export { ConfigurationType, ConfigurationTypeForCompleteTest, SimpleConfigurationType };