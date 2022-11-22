import Prometheus from "../utils/prometheus";
import fs from 'fs';
import path from 'path';

class Metrics {

    results : any[] = [];

    public async execPrometheus(stringQuery: string)
    {
        let intervalSecconds = 15;
        setInterval(async () => {
            let data = await Prometheus.PrometheusQueryExecutor(stringQuery);
            this.results.push(data)
        }, intervalSecconds * 1000);
    }

    public async saveJSONData(fileName: string)
    {
        try
        {
            const dirPath = path.join(__dirname + `/../temp/${fileName}`);
            console.log("Final Data", this.results);
            fs.writeFile(dirPath, JSON.stringify(this.results), 'utf8', (err) => {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log("Results Prometheus Saved");
                }
                process.exit();
            });
        }
        catch(e)
        {
            process.exit();
        }
    }

    public async clearMetrics()
    {
        this.results = [];
    }
}

export default Metrics;

