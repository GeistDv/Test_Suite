
type MetricsData = {
    dataTotalValidators: any,
    dataTotalApi: any,
    dataTotalRoot: any,
    maxDataApi: any,
    maxDataValidators: any,
    maxDataRoot: any
}

type MetricsResults = {
    cpu: MetricsData,
    memory: MetricsData
}

//export 
export default MetricsResults;