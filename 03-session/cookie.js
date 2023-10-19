const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const cookiesEntries = req.headers.cookie?.split(' ').map(el => el.split('=')) || []
    const cookies = Object.fromEntries(cookiesEntries)
    console.log('cookies', cookies)

    let counter = +cookies.cookiecount || 0

    // res.setHeader('Set-Cookie', `cookiecount = ${++counter}; Max-Age = 40000; HttpOnly`)
    // res.setHeader('Set-Cookie', 'name = ali; Max-Age = 30000; HttpOnly')

    res.setHeader('Set-Cookie', [
      'cookie1=value1; Path=/; HttpOnly; Max-Age=30000',
      `cookiecount=${++counter}; Path=/`,
      'cookie3=value3; Path=/about; Expires=13 Jan 2024 22:23:01 GMT'
    ]);

    res.end("hi");
  }
});

server.listen(3000, () => {
  console.log("server run");
});
