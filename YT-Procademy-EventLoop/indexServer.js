const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request recieved.");
  console.log(req.url);
  res.end("Hello from the server");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests");
});
