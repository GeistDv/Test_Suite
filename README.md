# Camino node - Test Suite

Set of performance test to validate network behavior when multiple simultaneous transactions are performed. The suite is designed to run tests on a test environment.

The project is largely automated. An api is exposed and when consumed it performs different types of tests. 
For example transactions in the C and X chain. We continue working to include more test types and make the project fully automated.

### Table Of Content
- [Camino node - Test Suite](#camino-node---test-suite)
    + [Table Of Content](#table-of-content)
    + [Test Suite Requirements.](#test-suite-requirements)
    + [Network Runner Requirements.](#network-runner-requirements)
    + [Cloning the repository.](#cloning-the-repository)
    + [Run Tests](#run-tests)
    + [Test Types](#test-types)
      - [Transfer](#transfer)
      - [Network Runner](#network-runner)

### Test Suite Requirements.

- Linux (Ubuntu).

- K8S Testnet Creator.
  Before installing the other requirements it is necessary to clone the `path-k8s-testnet-creator` repository `https://github.com/chain4travel/camino-k8s-testnet-creator.git`  and follow the instructions in the README.md file, including the installation of the tools specified in the `c4t specific tools` section:

  [kubectl]: https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/
  [gcloud]: https://cloud.google.com/sdk/docs/install#deb

- Go v1.19.1. 

  [Installation]: https://go.dev/doc/install

- Java JDK.

  [Installation]: https://www.java.com/en/download/help/linux_x64_install.html

- Jmeter 5.5 (Needs Java) 

  [Download]: https://jmeter.apache.org/download_jmeter.cgi

- Node 12.19.1

  [Download]: https://nodejs.org/ko/blog/release/v12.19.1/

  

### Network Runner Requirements.

- Gnome Terminal(if you already have installed Ubuntu, gnome terminal is default terminal).

- Camino Node.

  [Installation]: https://docs.camino.foundation/apps/nodes/run-camino-node

- Camino Network Runner.

  [Installation]: https://docs.camino.foundation/developer/build/create-a-local-test-network

   

### Cloning the repository.

1. Open Terminal.
2. Change the current working directory to the location where you want the cloned directory.
3. Copy the https repository URL:  `https://github.com/GeistDv/Test_Suite.git`
4. On the terminal type `git clone`, and then paste the URL you copied earlier.  

### Run Tests

Before running the tests, you must execute the installation command (only the first time): 
`npm install`

After that you must execute the command to start the application:

`npx ts-node app.ts`

When the command to start the application has been executed you will see the message `Server running on port 3000` in the console.

When the server is up and running, you can perform tests keeping in mind the following:

- **Request Payload Type: JSON**

- **Request Payload - Key - Value:**

  - "enable_gdocs_insertion": "true" or "false"
     Specify if you want to activate the insertion of the test results in Google Spreadsheet.
  - "enable_measurements": "true" or "false"
     Specify if you want collect kubectl measurements data.
  - "test_type": "transfer"
     Specify the test type(only transfer for now).
  - "rpc": "{rpc_url}"
     Specify the rpc url.
  - "rpc_keystore": "{rpc_url}/static"
     Specify the rpc keystore url(target only one node).
  - "sheet_name": "{document_sheet_name}"
     Specify the name of the sheet from which the test data is to be read and where the test results are 
     to be written.

- **Spreadsheet Document:**  `https://docs.google.com/spreadsheets/d/1bxCCl9PZqTqDXjIauamecW7rYiqbeAu43cxTuB1QU6g/edi
  t#gid=15878760`

  USE ONLY **SheetTest** OR CREATE YOUR OWN TEST SHEET

- **Environment Variables: `file name: .env`**

  - "GRUNGNI_PATH" - **REQUIRED - You must set it.** 
     You must specify your local **Grungni** project path.
  - "SPREADSHEET_ID" - **REQUIRED - Already set by default.**
     You must specify the spreadsheet document id if you use your own document.
  - "GDOCS_KEY_FILE" - **REQUIRED - Already set by default.**
     You must specify the spreadsheet document credentials file name if you use your own document.

  

### Test Types

- #### Transfer

  -cURL Sample:

  ```curl
  curl --location --request POST 'http://157.230.83.99:3000/start' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "enable_gdocs_insertion" : true,
      "enable_measurements" : true,
      "test_type" : "transfer",
      "rpc":"https://kopernikus.camino.foundation/santi",
      "rpc_keystore" : "https://kopernikus.camino.foundation/santi/static",
      "sheet_name": "SheetTest"
  }'
  ```

  

- #### Network Runner


​		You must initialize the application where the project is installed and run the following command

​		In the google spreadsheet only use the sheet with name "NetworkRunner"

​		In the google spreadsheet document you can only modify the number of validator nodes and the
​		number of threads

​		Resource consumption data will not be filled in network runner tests.

​		The Project is currently configured to read the following document, you can create the spreadsheets
​        you need for the tests with your specific cases


​     	https://docs.google.com/spreadsheets/d/1bxCCl9PZqTqDXjIauamecW7rYiqbeAu43cxTuB1QU6g/edit?u		s#gid=1320627956


​		You can run the following curl

​		curl -d '{ "enable_gdocs_insertion" : true,"test_type" : "transfer","sheet_name": "NetworkRunner" }' 
​    	-H  "Content-Type: application/json" -X POST http://127.0.0.1:3000/network-runner

​		If you set "enable_gdocs_insertion" to true, it will write to the defined blank fields of the spreadsheet.

​		When sending the request, a new gnome terminal will open on your local machine, which will be useful 
​		for monitoring the network in case of any downtime.



