const server = require("./api/server");

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log("Here we are, port 4k");
});
