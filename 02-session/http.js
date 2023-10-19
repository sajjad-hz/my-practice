const http = require("http");
const fs = require("fs");
const path = require("path");
const URL = require("url");

const modifyProps = (req, res) => {
  const { pathname, query } = URL.parse(req.url);

  const entries = query?.split("&").map((el, ind) => el.split("="));

  console.log("entries", entries);

  req.query = entries ? Object.fromEntries(entries) : {};

  req.pathname = pathname;

  res.json = (data) => {
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(data));
  };
};

const server = http.createServer((req, res) => {
  modifyProps(req, res);

  const { pathname, query } = req;
  console.log("pathname", pathname);
  console.log("query", query);

  //   res.end('Hiiiiii')
  res.setHeader("content-type", "text/html");

  if (pathname === "/") {
    return res.end("Home");
  }
  if (pathname === "/about") {
    return res.end("About Us");
  }
  if (pathname === "/contact") {
    data = fs.readFileSync(path.resolve(__dirname, "form-get.html"));
    return res.end(data);
  }
  if (pathname === "/contact/submit") {
    //   return res.end(JSON.stringify(query));
    return res.json(query);
  }
  if (pathname === "/favicon.ico") {
    console.log(path.resolve(__dirname, "images", "favicon.ico"));
    const filePath = fs.readFileSync(
      path.resolve(__dirname, "images", "favicon.ico")
    );
    return res.end(filePath);
  }
  res.statusCode = 404;
  res.end("404");
});

const server2 = http.createServer((req, res) => {
  res.end("salam");
});

server.listen(3000, () => {
  console.log("server is running");
});

server2.listen(3001, () => {
  console.log("second server is running");
});

function startServer(port) {
  const server = http.createServer((req, res) => {
    res.end("salam");
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${port} is already in use. Trying next port...`);
      startServer(port + 1);
    } else {
      console.error("Server error:", err);
    }
  });

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer(3000);
