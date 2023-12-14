//PART ONE
//Events and Event-Driven Architecture
/*const eventEmitter = require("events");

//Creating an event emitter
// let emitter = new eventEmitter();

class Customer extends eventEmitter {
  constructor() {
    super();
  }
}

let emitter = new Customer();

//Listening to an event
//Event Listener 1
emitter.on("addCustomer", () => {
  console.log("New customer added.");
});
//Event Listener 2
emitter.on("addCustomer", (name, id) => {
  console.log(`New customer ${name} created with ${id}.`);
});

//Emitting the event
// emitter.emit("addCustomer");
emitter.emit("addCustomer", "John", 1);*/

//PART TWO
const http = require("http");

const server = http.createServer();
server.on("request", (req, res) => {
  console.log("Request recieved");
  console.log(req.url);
  res.end("Hello from the server!!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests");
});
