const http = require("http");
require("dotenv").config();

const hostname = "127.0.0.1";
const port = 3000;

process.env.USER_ID;
process.env.USER_KEY;
process.env.USER_ENV;
const server = http.createServer((req, res) => {
  res.statusCode = 200; //indicates a successful response
  res.setHeader("Content-Type", "text/plain"); //Here, we set the content type header
  res.end("Heyy!!"); //Here, we close the response, adding the content as an argument to end()
});

server.listen(port, hostname, () => {
  console.log(`D Server is running at http://${hostname}:${port}.`);
  console.log(`process env user id: ${process.env.USER_ID}`);
});
