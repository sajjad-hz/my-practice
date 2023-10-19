const {parentPort, workerData} = require('worker_threads')

parentPort.on('message', (data) => {
  console.log(data)
  parentPort.postMessage('aleyke salam')
})

console.log(workerData.a, workerData.b)
