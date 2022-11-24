
interface IMetricsProvider {
    StartMeasurements() : Promise<boolean>;
    FinishMeasurements() : Promise<boolean>;
    GetMetrics() : Promise<any>;
}

export default IMetricsProvider;