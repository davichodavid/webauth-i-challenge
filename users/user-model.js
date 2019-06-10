const database = require("../data/databaseConfig");

module.exports = {
  register,
  login,
  find
};

function find() {
  return database("users").select("id", "username", "password");
}

function add(user) {
  return database("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return database("users")
    .where({ id })
    .first();
}
