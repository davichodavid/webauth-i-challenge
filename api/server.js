const express = require("express");
const helmet = require("helmet");

const server = express();
server.use(express.json(), helmet());

server.get("/", (req, res) => {
  res.json({ message: "oh we here alright" });
});

module.exports = server;
