//Understanding Streams In Node JS
const fs = require("fs");
const http = require("http");

//Create a server
const server = http.createServer();

server.on("request", (req, res) => {
  //Solution 1
  //   fs.readFile("large-file.txt", (error, data) => {
  //     if (error) console.log("Something went wrong.");
  //     res.end(data);
  //   });

  //Solution 2
  //To create a new readable stream.
  //Problem with readable stream - Our readable stream is much faster then actually sending the result
  // wih the response writable stream over the network. And this will overwhelm the response stream which can not
  //handleall this incoming data so fast. AND THIS PROBLEM IS CALLED BACK PRESSURE.
  //Back Pressure - It happens when the response can not send the data nearly as fast as it is recieving from the file
  //   const readable = fs.createReadStream("largefile.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   readable.on("error", (error) => {
  //     res.statusCode = 500;
  //     res.end("Internal server error");
  //   });

  //Solution 3- We can solve this backpressure problem with pipe() method
  //pipe() method allows us to pipe the  output of the readable stream write into the input of a writable stream.
  //So the pipe() method will pipe the input odf this 'readable' stream to the output of the writable stream i.e. (res) here
  //Pipe() method can only be used on a readable stream. So we need a readable source. And on that we can use the pipe method
  // and then to that particular pipe method we need to pass a writable destination.
  //Writable destination can be a writable stream or duplex stream or transform stream
  const readable = fs.createReadStream("large-file.txt");
  // console.log(readable);
  readable.pipe(res);
  console.log(readable.pipe(res));
  //   readableSource.pipe(writableDestination)
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to the server requests");
});
