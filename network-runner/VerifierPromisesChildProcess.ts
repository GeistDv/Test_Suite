

export async function promiseExitAndError(child: any) {
    return new Promise(function (resolve, reject) {
        child.addListener("error", reject);
        child.addListener("exit", resolve);
    });
}

export async function promiseFromChildProcess(child: any) {

    let outputsData: any[] = [];

    return new Promise(function (resolve, reject) {
        child.stdout.on("data", (data: any) => {
            outputsData.push(data);
        });

        child.stdout.on("close", (data: any) => {
            resolve(outputsData);
        });

        child.addListener("error", reject);
    });
}