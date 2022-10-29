rm data.csv

#declare variable
t1=$1
t2=$2
t3=$3
t4=$4

jmeter -JnoThreads0=$t1 -JnoThreads1=$t2 -JnoThreads2=$t3 -JnoThreads3=$t4 -n -t simplethread.jmx -l testresults.jtl
now=$(date +'%m-%d-%Y-%T')
dir_name="public/testreport-"
jmeter -g data.csv -o ${dir_name}${now}
ip=$(hostname -I |awk '{print $1}')
port=:3000
echo ${ip}${port}"/"${dir_name}${now}
echo ${dir_name}${now}