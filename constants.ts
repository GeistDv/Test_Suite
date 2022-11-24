
export abstract class Constants {
    static readonly ACCOUNTPINGPONG : string = "";
    static readonly MAXFEEPERGAS : number = 25000000000;
    static readonly MAXPRIORITYFEEPERGAS : number = 10000000;
    static readonly GAS : number = 2000000;
    static readonly NFTID : number = 7;
    static readonly NFTAMOUNT : number = 1000;
    static readonly INITIAL_FUNDS : string = "20";
    static readonly KEYSTORE_USER : string = "netacticateam";
    static readonly KEYSTORE_PASSWORD : string = "felipantiago45";
    static readonly PRIVATE_KEYS_FILE : string = "privatekeys.csv";
    static readonly AMOUNT_TO_TRANSFER : string = "0.1";

    static readonly PROMETEUS_ENDPOINT : string = "https://prometheus.camino.network/api/v1/query?query=";
    static readonly PROMETEUS_CPU_QUERY = 'camino_resource_tracker_cpu_usage{namespace="santi"}';
    static readonly PROMETEUS_MEMORY_QUERY = 'container_memory_usage_bytes{namespace="santi", image="europe-west3-docker.pkg.dev/pwk-c4t-dev/internal-camino-dev/camino-node:tiedemann-64de0a0003bfab988da62850eef37ef01f82fdad-1668765791"}';
}