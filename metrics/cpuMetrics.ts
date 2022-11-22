import Metrics from './Metrics';

let queryString = 'camino_resource_tracker_cpu_usage{namespace="santi"}';
let metrics = new Metrics();
metrics.execPrometheus(queryString);

process.on("disconnect", () => {
    metrics.saveJSONData("cpuMetrics.json");
})