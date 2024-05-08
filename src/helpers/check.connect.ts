const mongoose = require('mongoose');
const os = require('os');
const _SECONDS  = 20000

// Count connections
const countConnect = () => {
    const numConnections = mongoose.connections.length;
    //console.log(`Number of connections::${numConnections}`);
    return numConnections;
}

// Check overload
const checkOverload = () => {
    setInterval(() => {
        const numConnections = countConnect();
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        console.log(`Active mongodb connections:: ${numConnections}`);  
        console.log(`Memory usage of server:: ${memoryUsage / 1024 / 1024} MB`);
        //Example maximum number of connections based on number of cores
        const maximumConnections = numCores * 5;

        if (numConnections > maximumConnections){
            console.log(`Connection overload detected`) 
        }

    }, _SECONDS)
}

export {
    countConnect,
    checkOverload
};