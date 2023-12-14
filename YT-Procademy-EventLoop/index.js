const fs = require("fs");
const http = require("http");

//2nd phase callback queue
fs.readFile("textdata.txt", () => {
  console.log("File read complete!!");
  //1st phase callback queue
  setTimeout(() => {
    console.log("setTimeout. Timer callback executed!");
  }, 0);
  //3rd phase callback queue
  setImmediate(() => console.log("setImmediate. Immediate callback executed."));

  process.nextTick(() => console.log("process.nextTick() callback executed"));
});

//1st phase callback queue
// const time = setTimeout(() => {
//   console.log("setTimeout. Timer callback executed!");
// }, 0);

//3rd phase callback queue
// setImmediate(() => console.log("setImmediate. Immediate callback executed."));
// setTimeout(() => {
// clearTimeout(time);
// }, 3000);

//Working with Server
const server = http.createServer();
server.on("request", (req, res) => {
  console.log("Request recieved");
  res.end("Hello from the server!!");
});

// server.listen(8000, "127.0.0.1", () => {
//   console.log("Listening to requests");
// });
