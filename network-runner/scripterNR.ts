import NetworkRunner from './NetworkRunner';

export async function getConfigTypeWithNetworkRunner(req: any, validatorNodes: number) {
    let networkRunner = new NetworkRunner(req.body, validatorNodes);
    let nodes: any = await networkRunner.runNetworkRunner();
    networkRunner.configuration.rpc = nodes[0];
    networkRunner.configuration.rpc_keystore = nodes[0]; 
    return networkRunner;
}