const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cors = require("cors");
require("./db.js");

const server = express();
const http = require("http").createServer(server);
const io = require("socket.io")(http, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

io.on("connection", (socket) => {
  console.log("Client connected: ", socket.handshake.query.ID);
  socket.join(socket.handshake.query.ID);
  socket.on("NOTIFICATIONS", (data) => {
    console.log(data);
    socket.to(data.to).emit("NOTIFICATIONS", data);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.handshake.query.ID);
  });
});

server.use((req, res, next) => {
  req.io = io;
  next();
});

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use(cors());
server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = http;
