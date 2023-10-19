const http = require("http");
const fs = require("fs");
const path = require("path");
const URL = require("url");
const static = require("node-static");

const PUBLIC_DIR = "public";
const fileServer = new static.Server(PUBLIC_DIR);

// const staticFileServer = (req, res) => {
//   const { pathname } = URL.parse(req.url);

//   const filePathname = path.resolve(
//     __dirname,
//     PUBLIC_DIR,
//     ...pathname.split("/")
//   );

//   if (fs.existsSync(filePathname)) {
//     data = fs.readFileSync(path.resolve(filePathname));
//     res.end(data);
//     return true;
//   }

//   return false;
// };

const server = http.createServer((req, res) => {
  const { pathname } = URL.parse(req.url);

  //   console.log('pathname', pathname)
  if (pathname === "/") {
    data = fs.readFileSync(path.resolve(__dirname, "index.html"));
    return res.end(data);
  }

  //   if (pathname === '/style.css') {
  //     data = fs.readFileSync(path.resolve(__dirname, 'style.css'))
  //     return res.end(data)
  //   }

  //   if (staticFileServer(req, res)) {
  //     return;
  //   }

  fileServer.serve(req, res, (error, response) => {
    if (error) {
      response.statusCode = 404;
      response.end("not found");
    }
  });

  //   res.statusCode = 404;
  //   res.end("not found");
});

server.listen(3000, () => {
  console.log("srever is running");
});
