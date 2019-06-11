const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const KnexSessionStore = require("connect-sessions-knex")(session);

const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");

const server = express();

const sessionCofig = {
  name: "money",
  secret: "What is going on?",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true
  },
  store: new KnexSessionStore({
    knex: require("../data/databaseConfig"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 30
  })
};

server.use(express.json(), helmet(), session(sessionCofig));

server.get("/", (req, res) => {
  res.json({ message: "oh we here alright" });
});

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

module.exports = server;
