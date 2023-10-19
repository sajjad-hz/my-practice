const http = require('http');

function startServer(port) {
  const server = http.createServer((req, res) => {
    res.end("salam");
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
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