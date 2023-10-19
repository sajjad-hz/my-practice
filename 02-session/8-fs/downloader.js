const path = require("path");
const fs = require("fs");
const https = require("https");

const filePath = path.resolve(__dirname, "links.txt");
const data = fs.readFileSync(filePath, "utf-8");

const files = data.split("\n");

const dir = path.resolve(__dirname, "downloads");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

async function downloadAll() {
  for (const file of files) {
    const fileUrl = decodeURI(file);
    const fileName = path.basename(fileUrl).replace(/\s/g, "");
    const filePath = path.resolve(dir, fileName);

    await downloadFile(fileUrl, filePath);

    console.log(`${fileName} Completed`);
  }
}

function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(filePath);

    https.get(url, (response) => {
      response.pipe(fileStream);

      response.on("end", () => {
        fileStream.close();
        resolve();
      });

      response.on("error", (error) => {
        reject(error);
      });
    });
  });
}

downloadAll()
  .then(() => {
    console.log("All files downloaded successfully.");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
