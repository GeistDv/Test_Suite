import IMetricsProvider from "../interfaces/IMetricsProvider";
import KubectlChecker from '../automation/KubectlChecker';
import MetricsResults from "../types/metricsResults";

class KubectlProvider implements IMetricsProvider {

    data: MetricsResults = {
        cpu: {
            dataTotalValidators: null,
            dataTotalApi: null,
            dataTotalRoot: null,
            maxDataApi: null,
            maxDataValidators: null,
            maxDataRoot: null
        },
        memory: {
            dataTotalValidators: null,
            dataTotalApi: null,
            dataTotalRoot: null,
            maxDataApi: null,
            maxDataValidators: null,
            maxDataRoot: null
        }
    }

    KubectlCheckerApi: KubectlChecker;
    KubectlCheckerRoot: KubectlChecker;
    KubectlCheckerValidator: KubectlChecker;

    timer: any =
        {
            seconds: 0,
            running: false
        }

    constructor() {
        this.KubectlCheckerApi = new KubectlChecker(`kubectl top pods --all-namespaces | grep "${process.env.networkName}-api"`);
        this.KubectlCheckerRoot = new KubectlChecker(`kubectl top pods --all-namespaces | grep "${process.env.networkName}-root"`);
        this.KubectlCheckerValidator = new KubectlChecker(`kubectl top pods --all-namespaces | grep "${process.env.networkName}-validator"`);
    }

    public StartMeasurements(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.executeAndInitTimer();
            resolve(true);
        });
    }

    public FinishMeasurements(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.stopTimer();
            resolve(true);
        })
    }

    public GetMetrics(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(this.data);
        });
    }

    private executeAndInitTimer() {
        const incrementSeconds = async () => {
            let secondsLimitExec = 10;
            if (this.timer.seconds === secondsLimitExec) {
                this.timer.seconds = 0;
                await this.KubectlCheckerApi.execCommand();
                await this.KubectlCheckerRoot.execCommand();
                await this.KubectlCheckerValidator.execCommand();
            }
            else {
                this.timer.seconds++;
            }
        }
        this.timer.running = setInterval(incrementSeconds, 1000);
    }

    private async stopTimer() {
        await this.saveData();
        clearInterval(this.timer.running);
        this.timer.running = null;
        this.timer.seconds = 0;
        await this.restarMaxCPUAndMaxMemory();
    }

    private async saveData() {

        this.data.cpu.dataTotalApi = this.KubectlCheckerApi.calculateAverageCPU();
        this.data.cpu.dataTotalRoot = this.KubectlCheckerRoot.calculateAverageCPU();
        this.data.cpu.dataTotalValidators = this.KubectlCheckerValidator.calculateAverageCPU();

        this.data.cpu.maxDataApi = this.KubectlCheckerApi.maxCPUPods;
        this.data.cpu.maxDataRoot = this.KubectlCheckerRoot.maxCPUPods;
        this.data.cpu.maxDataValidators = this.KubectlCheckerValidator.maxCPUPods;

        this.data.memory.dataTotalApi = this.KubectlCheckerApi.calculateAverageMemory();
        this.data.memory.dataTotalRoot = this.KubectlCheckerRoot.calculateAverageMemory();
        this.data.memory.dataTotalValidators = this.KubectlCheckerValidator.calculateAverageMemory();

        this.data.memory.maxDataApi = this.KubectlCheckerApi.maxMemoryPods;
        this.data.memory.maxDataRoot = this.KubectlCheckerRoot.maxMemoryPods;
        this.data.memory.maxDataValidators = this.KubectlCheckerValidator.maxMemoryPods;

    }

    private async restarMaxCPUAndMaxMemory() {
        this.KubectlCheckerApi.restarMaxCPUAndMaxMemory();
        this.KubectlCheckerRoot.restarMaxCPUAndMaxMemory();
        this.KubectlCheckerValidator.restarMaxCPUAndMaxMemory();
    }

}

//export
export default KubectlProvider;
