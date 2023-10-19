const path = require("path");
const { Worker } = require("worker_threads");

process.title = "Master";

function makeWorker(a, b) {
  const workerPath = path.resolve(__dirname, "worker.js");

  const worker = new Worker(workerPath, {
    workerData: {
      a,
      b,
    },
  });

  worker.postMessage("sent message");

  worker.on("message", (data) => {
    console.log(data);
    if (data === "terminate") {
      worker.terminate();
    }
  });


}

makeWorker('sajjad', 'h')

// setTimeout(() => {
//   worker.terminate();
// }, 4000);
