const Stream = require("stream");
const fs = require("fs");

const transforStream = new Stream.Transform({
    transform: (chunk, encoding) => {
      const data = chunk.toString().toUpperCase()
      const arr = chunk.toString().split('\n')
        arr.map(( name, ind) => {
            // fs.rename(name, name.toLowerCase(), ()=> {})
            // fs.rename('other.js', name.toUpperCase(), ()=> {})
            fs.appendFile(name,'new-file.js', ()=> {})
        })
      transforStream.push(data)
    }
})

// Create a readable stream that emits your string data
const stringData = "hamed.js";
const readableStream = new Stream.Readable({
    read: function() {
        this.push(stringData);
        this.push(null); // Signal the end of data
    }
});

// Pipe the readable stream to the transform stream
readableStream.pipe(transforStream);

// Listen for data events from the transform stream
// transforStream.on("data", (chunk) => {
//     console.log(chunk.toString()); // Output the transformed data
// });


