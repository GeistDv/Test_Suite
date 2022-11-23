import Metrics from './Metrics';

let queryString = 'container_memory_usage_bytes{namespace="santi", image="europe-west3-docker.pkg.dev/pwk-c4t-dev/internal-camino-dev/camino-node:tiedemann-64de0a0003bfab988da62850eef37ef01f82fdad-1668765791"}';
let metrics = new Metrics();
metrics.execPrometheus(queryString);

process.on("message", (msg) => {
    if(msg.readData)
    {
        process.send != undefined ? process.send({data: metrics.results}) : null;
    }
})

process.on("disconnect", () => {
    //metrics.saveJSONData(`memoryMetrics${process.env.caseTest}.json`);
    metrics.clearMetrics();
})