import Metrics from './Metrics';

let queryString = 'container_memory_usage_bytes{namespace="santi"}';
let metrics = new Metrics();
metrics.execPrometheus(queryString);

process.on("disconnect", () => {
    metrics.saveJSONData("memoryMetrics.json");
})