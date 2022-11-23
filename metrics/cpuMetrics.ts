import Metrics from './Metrics';

let queryString = 'camino_resource_tracker_cpu_usage{namespace="santi"}';
let metrics = new Metrics();
metrics.execPrometheus(queryString);

process.on("message", (msg) => {
    if(msg.readData)
    {
        process.send != undefined ? process.send({data: metrics.results}) : null;
    }
})

process.on("disconnect", () => {
    //metrics.saveJSONData(`cpuMetrics${process.env.caseTest}.json`);
    metrics.clearMetrics();
})