import Web3 from 'web3';
import ITransactionBuilder from '../interfaces/ItransactionBuilder';
import { ConfigurationType } from '../types/configurationtype';
import axios from 'axios';
import { BinTools, Buffer } from "avalanche"
import DataFlow from '../types/dataflowtype';
import { Constants } from '../constants';
const bintools: BinTools = BinTools.getInstance()

class SendXChainBuilder implements ITransactionBuilder {
    
    ContractAbi : any;
    Configuration : ConfigurationType;
    DataFlow : DataFlow;
    private AssetId : string = "";
    private Bech32Address: string = "";
    web3 : Web3;

    constructor(Config : ConfigurationType,web3: Web3, PrivateKey : string, dataFlow:DataFlow) {
        this.ContractAbi = {}
        this.Configuration = Config;
        this.DataFlow = dataFlow;
        this.web3 = web3;
        
        this.GetAssetID().then(data => { this.AssetId = data; });
        this.CreateUser();
        this.TranslatePKToCb58(PrivateKey)
        .then(data => {  
          this.ImportKey(data)
        });
    }

    
    deployContract(privateKey: string, web3: Web3): Promise<string> {
      return new Promise(async (resolve, reject) => {
       resolve("");
      });
   }
    
    async TranslatePKToCb58(hexPrivKey : string) : Promise<string> {
        let buf: Buffer = Buffer.from(hexPrivKey.replace('0x', ''), 'hex')
        let encoded: string = `PrivateKey-${bintools.cb58Encode(buf)}`
        return encoded;
    }

     async CreateUser() : Promise<any> {

        console.log("Creating user..");

        var data = JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1,
            "method": "keystore.createUser",
            "params": {
              "username": Constants.KEYSTORE_USER,
              "password": Constants.KEYSTORE_PASSWORD
            }
          });

          var request =
          {
            method: 'post',
            url: this.Configuration.rpc + '/ext/keystore',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          return axios(request).then(data => { console.log("Done"); });
       
    }

    private async ImportKey(cb58PrivateKey : string) : Promise<any> {
        
        console.log("Importing key..");
        var data = JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1,
            "method": "avm.importKey",
            "params": {
              "username": Constants.KEYSTORE_USER,
              "password": Constants.KEYSTORE_PASSWORD,
              "privateKey": cb58PrivateKey
            }
          });

          var request =
          {
            method: 'post',
            url: this.Configuration.rpc + '/ext/bc/X',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };

          try
          {
            var response = await axios(request);
            this.Bech32Address = response.data.result.address;
            return response.data.result.address;
          }
          catch(err)
          {

          }
    }

    private async GetAssetID() : Promise<string> {

        var data = JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1,
            "method": "platform.getStakingAssetID",
            "params": {}
        });
        
        var config = {
            method: 'post',
            url: this.Configuration.rpc + '/ext/bc/P',
            headers: { 
            'Content-Type': 'application/json'
            },
            data : data
        };

        var reponse = await axios(config)
        return reponse.data.result.assetID;
    }

    async buildAndSendTransaction(
        privateKey : string,
        contractAddress : string, 
        sendTo : string,
        amount: string): Promise<string>
         
    {
        return new Promise(async (resolve, reject) => {
          
          var request = 
            {
              method: 'post',
              url: this.Configuration.rpc + '/ext/bc/X',
              data: {
                  "jsonrpc": "2.0",
                  "id": 1,
                  "method": "avm.send",
                  "params": {
                      "assetID": "AVAX",
                      "amount": amount,
                      "from": [this.DataFlow.bech32_xchain_address],
                      "to": this.DataFlow.bech32_xchain_address,
                      "changeAddr" :  this.DataFlow.bech32_xchain_address,
                      "username": Constants.KEYSTORE_USER,
                      "password": Constants.KEYSTORE_PASSWORD
                  }
              }
            }

            console.log(request);
 
              //execute request using axios
            axios(request)
            .then(function (response) {
                console.log("TxID", response.data);
                resolve(response.data.result.txID);
            })
            .catch(function (error) {
                reject(error);
                console.log(error);
            });
        });
    }
}

export default SendXChainBuilder;