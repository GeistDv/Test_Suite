# Camino node - Test Suite


### Network Runner Requirements

- Linux (Ubuntu)
- Go
- Camino Node
- Camino Network Runner
- Java
- Jmeter (Needs Java) 5.5
- Gnome Terminal(if you have installed Ubuntu, gnome terminal is default terminal)
- Node 12.19.1

## Run Tests with Network Runner

You must initialize the application where the project is installed and run the following command

In the google spreadsheet only use the sheet with name "NetworkRunner"

In the google spreadsheet document you can only modify the number of validator nodes and the number of threads

Resource consumption data will not be filled in network runner tests

```sh
npm install
npx ts-node app.ts
```

The Project is currently configured to read the following document, you can create the spreadsheets you need for the tests with your specific cases

https://docs.google.com/spreadsheets/d/1bxCCl9PZqTqDXjIauamecW7rYiqbeAu43cxTuB1QU6g/edit?usp=sharing


You can run the following curl

curl -d '{ "enable_gdocs_insertion" : true,"test_type" : "transfer","sheet_name": "NetworkRunner" }' -H "Content-Type: application/json" -X POST http://127.0.0.1:3000/network-runner

If you set "enable_gdocs_insertion" to true, it will write to the defined blank fields of the spreadsheet.

When sending the request, a new gnome terminal will open on your local machine, which will be useful for monitoring the network in case of any downtime.




