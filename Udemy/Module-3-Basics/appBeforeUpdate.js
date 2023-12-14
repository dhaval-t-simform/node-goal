const http = require("http");
const fs = require("fs");
// function reqListener(req, res) {
// }
// http.createServer(reqListener);

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  // if (url === "/message" && method === "POST") {
  //   const body = [];
  //   req.on("data", (chunk) => {
  //     console.log(chunk);
  //     body.push(chunk);
  //     console.log(body);
  //   });
  //   req.on("end", () => {
  //     console.log(Buffer.concat(body).toString());
  //     const parsedBody = Buffer.concat(body).toString();
  //     console.log(parsedBody);
  //   });
  //   fs.writeFileSync("message.txt", "DUMMY");
  //   res.statusCode = 302;
  //   res.setHeader("Location", "/");
  //   return res.end();
  // }
  // if (url === "/message" && method === "POST") {
  //   fs.writeFileSync("message.txt", "DUMMY");
  //   res.statusCode = 302;
  //   res.setHeader("Location", "/");
  //   return res.end();
  // }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      // console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      // console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      // fs.writeFileSync("message.txt", message);
      // Event Driven Architecture
      fs.writeFile("message.txt", message, (error) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
      // res.statusCode = 302;
      // res.setHeader("Location", "/");
      // return res.end();
    });
    // fs.writeFileSync("message2.txt", "Duaaammy text");
    // fs.writeFileSync("message1.txt", "Dummy1 text");
    // res.statusCode = 302;
    // res.setHeader("Location", "/");
    // return res.end();
    // res.writeHead(302, {});
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>First Node JS server!</h1></body>");
  res.write("</html>");
  res.end();

  // console.log(req.url, req.headers, req.method);
  // console.log(
  //   "Request url -" + req.url,
  //   "Request method -" + req.method,
  //   "Request header -" + r eq.headers
  // );
  //   process.exit();
});

server.listen(3000);
