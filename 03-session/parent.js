const { spawn } = require("child_process");
const path = require("path");

console.log('parent ID',process.pid)

const controller = new AbortController()

process.title = "Node-Parent";

const child = spawn("node", [path.resolve(__dirname, "child.js")], {
  signal: controller.signal
});

child.stdout.on("data", (data) => {
  console.log(data.toString());
});

setTimeout(() => {
  controller.abort()
}, 5000);
