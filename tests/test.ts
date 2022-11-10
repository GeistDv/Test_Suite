//implement algorithm that executes a queue of tasks
//each task is a function that returns a promise

function main()
{
  //build dynamic array with a integer value
  let initialAccountsWithFunds : number [] = Array.from(Array(10).keys());
  let privateKeysAccountsWithoutFunds: number[] = Array.from(Array(100).keys());

  //split array into chunks
  let queues : number[][] = splitListIntoChunksOfLen(privateKeysAccountsWithoutFunds, initialAccountsWithFunds.length);
  console.log(queues);
  for(let i = 0; i < queues.length; i++)
  {
    var txs :number[][] = queues[i].map((value, index) => [initialAccountsWithFunds[i], value]);
    executeQueue(txs);
  }
}

async function executeQueue(queue: number[][]) {
   //convert array into promises

    for(let i = 0; i < queue.length; i++)
    {
        await sendTransaction(queue[i][0], queue[i][1], 1)
    }
    //Promise.all(promises);
}

async function sendTransaction(from : number, to : number, amount : number) : Promise<string>
{
    //wait for a random amount of time 
    await new Promise(resolve => setTimeout(resolve, Math.random() * 10000));
    let txId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    console.log("Sending fund transaction from : " + from + " to : " + to + " amount : " + amount);
    return new Promise(resolve => resolve(txId));
}

//split array into chunks
function splitListIntoChunksOfLen(list : number[], len : any) {
    let chunks : number [][] = [];
    let i = 0, n = list.length;
    while (i < n) {
        chunks.push(list.slice(i, i += len));
    }
    return chunks;
}

main();