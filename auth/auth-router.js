const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/user-model");

router.post("/register", (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.add(user)
    .then(creds => res.status(201).json(creds))
    .catch(err => res.status(500).json(err));
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username;
        res
          .status(200)
          .json({ messge: `Welcome ${user.username}, have a cookie` });
      } else {
        res.status(401).json({ message: "Invalid Creds Bro" });
      }
    })
    .catch(err => res.status(500).json(err));
});

router.delete("/", (req, res) => {
  if (req.session) {
    req.session.destroy();
  }
  res.status(200).json({ message: "good bye" });
});

module.exports = router;
