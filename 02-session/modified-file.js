const Stream = require("stream");
const fs = require('fs');
const path = require('path');

const writableStream = new Stream.Writable({
    write: (chunk, encoding, next) => {
        chunks.push(chunk);
        next(); // Call next when the data has been processed
    }
});

const readableStream = new Stream.Readable({
    read: (size) => {
        // No need to manually push chunks here
    }
});

const chunks = [];

readableStream.pipe(writableStream);

writableStream.on('finish', () => {
    console.log('Writable stream finished');
    const fileReceived = Buffer.concat(chunks);
    const newFilePath = path.resolve(__dirname, 'newImage.jpg');
    fs.writeFileSync(newFilePath, fileReceived);
    console.log('File written:', newFilePath);
});

const filePath = path.resolve(__dirname, 'me.jpg');
const data = fs.readFileSync(filePath);
const chunkSize = 2 ** 16;

const chunkCount = Math.ceil(data.length / chunkSize);
console.log('chunkCount', chunkCount)

for (let i = 0; i < chunkCount; i++) {
    const chunk = data.subarray(i * chunkSize, (i + 1) * chunkSize);
    readableStream.push(chunk); // Push the chunk to the readable stream
}

readableStream.push(null); // Signal the end of data to the readable stream
