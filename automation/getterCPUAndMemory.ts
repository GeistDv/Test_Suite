import KubectlChecker from './KubectlChecker';
import { ConfigurationType } from '../types/configurationtype';

let seconds: number = 0;
let running: any;

let KubectlCheckerApi : KubectlChecker;
let KubectlCheckerRoot : KubectlChecker;
let KubectlCheckerValidator : KubectlChecker;

export function initKubectlChecker() {
    KubectlCheckerApi = new KubectlChecker(`kubectl top pods --all-namespaces | grep "ivancho-api"`);
    KubectlCheckerRoot = new KubectlChecker(`kubectl top pods --all-namespaces | grep "ivancho-root"`);
    KubectlCheckerValidator = new KubectlChecker(`kubectl top pods --all-namespaces | grep "ivancho-validator"`);
}

export function startTimerVerifyKubectl() {
    try {
        const incrementSeconds = async () => {
            let secondsLimitExec = 10;
            if (seconds === secondsLimitExec) {
                seconds = 0;
                await KubectlCheckerApi.execCommand();
                await KubectlCheckerRoot.execCommand();
                await KubectlCheckerValidator.execCommand();
            }
            else {
                seconds++;
            }
        }
        running = setInterval(incrementSeconds, 1000);
    }
    catch (e) {
        running = null;
        console.log("Verify Kubectl", e);
    }

}

export function finishTimerKubcetl(configurationType: ConfigurationType) {
    let dataKuberctl: any = {
        api: {
            cpu: null,
            memory: null,
            maxCPU: null,
            maxMemory: null
        },
        root: {
            cpu: null,
            memory: null,
            maxCPU: null,
            maxMemory: null
        },
        validators: {
            cpu: null,
            memory: null,
            maxCPU: null,
            maxMemory: null
        }
    }
    try {
        if (configurationType.enable_kubectl_measurements) {
            dataKuberctl = getGroupsKuberctlData();
            clearInterval(running);
            running = null;
            seconds = 0;
        }
        return dataKuberctl;
    }
    catch (e) {
        return dataKuberctl;
    }
}

export function restarMaxCPUAndMaxMemory() {
    KubectlCheckerApi.restarMaxCPUAndMaxMemory();
    KubectlCheckerRoot.restarMaxCPUAndMaxMemory();
    KubectlCheckerValidator.restarMaxCPUAndMaxMemory();
}

function getGroupsKuberctlData() {
    let dataKuberctl = {
        api: {
            cpu: KubectlCheckerApi.calculateAverageCPU(),
            memory: KubectlCheckerApi.calculateAverageMemory(),
            maxCPU: KubectlCheckerApi.maxCPUPods,
            maxMemory: KubectlCheckerApi.maxMemoryPods,
        },
        root: {
            cpu: KubectlCheckerRoot.calculateAverageCPU(),
            memory: KubectlCheckerRoot.calculateAverageMemory(),
            maxCPU: KubectlCheckerRoot.maxCPUPods,
            maxMemory: KubectlCheckerRoot.maxMemoryPods,
        },
        validators: {
            cpu: KubectlCheckerValidator.calculateAverageCPU(),
            memory: KubectlCheckerValidator.calculateAverageMemory(),
            maxCPU: KubectlCheckerValidator.maxCPUPods,
            maxMemory: KubectlCheckerValidator.maxMemoryPods,
        }
    }

    return dataKuberctl;
}