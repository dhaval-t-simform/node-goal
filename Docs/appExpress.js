//Starting a server using express
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello!!");
});

// app.listen(3001, () => console.log("Server using express"));
const server = app.listen(3001, () => console.log("Server using express"));

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});

// process.kill(process.pid, "SIGTERM");
