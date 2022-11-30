type SimpleConfigurationType =
{
    test_type: string;
    enable_measurements : boolean;
    enable_gdocs_insertion : boolean;
    sheet_name : string;
    measurements_provider?: string
}

//create type configuration that includes SimpleConfigurationType
type ConfigurationTypeForCompleteTest = SimpleConfigurationType & {
    rpc : string;
    rpc_keystore : string;
}

type ConfigurationType = ConfigurationTypeForCompleteTest & {
    private_key_with_funds : string;
}

export { ConfigurationType, ConfigurationTypeForCompleteTest, SimpleConfigurationType };