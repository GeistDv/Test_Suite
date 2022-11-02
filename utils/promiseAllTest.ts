

async function test1 () 
{
    return new Promise((resolve, reject) => {
        resolve("1");
    });
}


async function test2 () 
{
    return new Promise((resolve, reject) => {
        resolve("2");
    });
}

async function testFinal () 
{
    let promiseAllData = await Promise.all([test1(),test2()]);
    console.log(promiseAllData);
}

testFinal();