const Stream = require("stream");
const fs = require('fs')
const path = require('path')



// const writableStream = new Stream.Writable();

// writableStream._write = (chunk, encoding, next) => {
//   console.log("chunk", chunk);
//   next();
// };

// const readableStream = new Stream.Readable();

// readableStream._read = (size) => {
//   console.log("size", size);
// };

// readableStream.pipe(writableStream);

// let count = 1;

// const intID = setInterval(() => {
//   readableStream.push(String(count++));
// }, 1000);

// readableStream.on("close", () => writableStream.end());
// writableStream.on("close", () => console.log("writable closed"));

// setTimeout(() => {
//   clearInterval(intID)
//   readableStream.destroy();
//   console.log(readableStream.destroyed) ;
// }, 3000);



console.log('dir', __dirname)

const filePath = path.resolve(__dirname, 'me.jpg')
console.log('filePath', filePath)

const data = fs.readFileSync(filePath)
console.log('data', data)
