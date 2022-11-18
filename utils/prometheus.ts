import axios from 'axios';
//import {ConfigurationType } from "../types/configurationtype";

class Prometheus {


    public static async PrometheusQueryExecutor(queryString:string): Promise<string> {

        console.log("Making Prometheus request");
        return new Promise(async (resolve, reject) => {
            var request = {
                method: 'post',
                url: 'https://prometheus.camino.network/api/v1/query?query=' + queryString
            };

            axios(request)
            .then(function (response) {
                proccesJson(response.data);
                //console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
                reject(false)
                console.log(error);
            });
        });
    }
}
function proccesJson(json: JSON){

    //TODO: Implement logic for get and register metrics 
    console.log(json)
}



export default Prometheus;

