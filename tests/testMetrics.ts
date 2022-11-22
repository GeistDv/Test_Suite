import { execPrometheus, disconnectPrometheusProcess} from '../metrics/getMetrics';


console.log("starting tests");
for(let i = 0; i <= 2; i++)
{
    execPrometheus();

    setTimeout(() => {
        disconnectPrometheusProcess();
    },20000);
}