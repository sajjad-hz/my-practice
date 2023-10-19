const Stream = require("stream");
const fs = require('fs')
const path = require('path')

let chunks = []

const writableStream = new Stream.Writable({
    write: (chunk, encoding, next) => {
        chunks.push(chunk)
        next()
    }
})

const readableStream = new Stream.Readable({
    read: (size) => {
        console.log('size', size)
    }
})

readableStream.pipe(writableStream)

readableStream.on('close', () => {
  writableStream.end()
})

writableStream.on('close', () => {
  console.log('Writable stream closed')
  const fileReceived = Buffer.concat(chunks)
  console.log('fileReceived', fileReceived)
  const newFilePath = path.resolve(__dirname, 'newImage.jpg')
  fs.writeFileSync(newFilePath,fileReceived)
})

const filePath = path.resolve(__dirname, 'me.jpg')

const data = fs.readFileSync(filePath)

const chunkSize = 2 ** 14 //1kb

const chunkCount = Math.ceil(data.length / chunkSize)
console.log('chunkCount', chunkCount)

for (let i = 0; i < chunkCount; i++) {
    const chunk = data.subarray(i * chunkSize, (i + 1) * chunkSize)
    readableStream.push(chunk)
}

readableStream.destroy()