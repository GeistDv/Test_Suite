

touch ./network-runner/PPID.txt
echo $PPID > ./network-runner/PPID.txt
cd $GOPATH/bin
camino-network-runner server --log-level debug --port=":8080" --grpc-gateway-port=":8081"