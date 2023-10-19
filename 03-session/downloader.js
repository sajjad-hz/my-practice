const path = require("path");
const fs = require("fs");
const https = require("https");

const filePath = path.resolve(__dirname, "links.txt");
const data = fs.readFileSync(filePath, "utf-8");

const files = data.split("\n");

const downDir = path.resolve(__dirname, "download");

if (!fs.existsSync(downDir)) {
    fs.mkdirSync(downDir);
}

files.forEach((file) => {
    const fileUrl = decodeURI(file);
  const fileName = path.basename(fileUrl).replace(/\s/g, "");
  const downPath = path.resolve(downDir, fileName);
  const fileStream = fs.createWriteStream(downPath);

  https.get(file, (response) => {
    response.pipe(fileStream)

    response.on('end', () => {
      fileStream.close()
      console.log(`file ${fileName} is downloaded`)
    })
  });
});
