//create a class to read configuration

import { google } from "googleapis";
import TestCase from "./types/testcase";
import dotenv from 'dotenv';

dotenv.config();

class DataTests {

    public static async readDataTest(sheetName: string) : Promise<TestCase[]> {
        
        return new Promise<TestCase[]>(async (resolve, reject) => 
        {
            const auth = new google.auth.GoogleAuth({
                keyFile: "gdocscredentials.json",
                scopes: process.env.GDOCS_SCOPES,
            });
                
            // instance of google sheets API
            const googleSheets = google.sheets('v4');
                
            // Get metadata about spreadsheet
            const metaData = await googleSheets.spreadsheets.get({
                auth,
                spreadsheetId: process.env.SPREADSHEET_ID,
            });
        
            // Read rows from spreadsheet
            const getRows = googleSheets.spreadsheets.values.get({
                auth,
                spreadsheetId: process.env.SPREADSHEET_ID,
                range: `${sheetName}!2:500`,
            });

            getRows.then((data) => {
                let rows = data.data.values;
                console.log(rows?.length)
                let testCases: TestCase[] = [];
                
                //convert to normal for loop
                if(rows == undefined || rows == null) {
                    reject("No data found");
                    return;
                }

                let position = 2;
                for (let i = 0; i < rows.length; i++) {

                    let row = rows[i];

                    console.log(row);
                    if(row == undefined || row[29] == true || row.length == 0)  {
                        continue;
                    }

                    if(row[8] != undefined) {
                        continue;
                    }
                    
                    let testCase: TestCase = {
                        StakingAmount: row[0],
                        ValidatorNodes: row[1],
                        ApiNodes: row[2],
                        Threads: row[3],
                        Loops: row[4],
                        Chain: row[5],
                        TestType: row[6],
                        Position: position + i,
                    }

                    console.log(testCase);
                    testCases.push(testCase);
                }

                resolve(testCases);
            }).catch(err => {
                reject(err);
            });
        });

    }

    public static async writeDataInGdocs(data: any, position: number, sheetName: string) {  

        const auth = new google.auth.GoogleAuth({
            keyFile: "gdocscredentials.json",
            scopes: process.env.GDOCS_SCOPES,
        });
        const sheet = google.sheets("v4")
        await sheet.spreadsheets.values.append({
          spreadsheetId: process.env.SPREADSHEET_ID,
          auth: auth,
          range: `${sheetName}!I${position}:AD${position}`,
          valueInputOption: "RAW",
          requestBody: {
            values: [
                [
                    data.meanResTime,
                    data.maxResTime,
                    data.avgBlockTime,
                    data.maxBlockTime,
                    data.minBlockTime,
                    data.throughput,
                    data.maxTPS,
                    data.validatorsMemory,
                    data.validatorsCPU,
                    data.rootMemory,
                    data.rootCPU,
                    data.apiMemory,
                    data.apiCPU,
                    data.maxMemoryAPI,
                    data.maxMemoryRoot,
                    data.maxMemoryValidators,
                    data.maxCPUAPI,
                    data.maxCPURoot,
                    data.maxCPUValidators,
                    data.timeProcess,
                    data.errorPct
            ]
        ]
          }
        }).then((res: any) => {
            console.log(res.data)
            })
        .catch((err: any) => {
            console.log(err)
        })
    }

}

export default DataTests;