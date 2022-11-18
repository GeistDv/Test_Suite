import Prometheus from "../utils/prometheus";

let queryString = 'max_over_time(camino_resource_tracker_cpu_usage{namespace="santi"}[1m])';
Prometheus.PrometheusQueryExecutor(queryString)
.then((result) => {
    //return result;
    console.log("Result: " + result);
})
.catch((error) => {
    console.log("Error: " + error);
});

//'max_over_time(camino_resource_tracker_cpu_usage{namespace="kopernikus", pod="kopernikus-root-0"}[1m])'


//API
//VALIDADORES
//ROOT
