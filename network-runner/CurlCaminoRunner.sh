
cd $GOPATH/bin
t1=$1
curl -X POST -k http://localhost:8081/v1/control/start -d '{"execPath":"'${CAMINO_EXEC_PATH}'","numNodes":'$t1',"logLevel":"INFO"}'