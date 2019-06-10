const router = require("express").Router();
const Users = require("./user-model");
const restricted = require("../auth/restricted");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

module.exports = router;
