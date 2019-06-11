const express = require("express");
const helmet = require("helmet");

const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");

const server = express();
server.use(express.json(), helmet());

server.get("/", (req, res) => {
  res.json({ message: "oh we here alright" });
});

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

module.exports = server;
