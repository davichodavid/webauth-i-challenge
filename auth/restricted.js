module.exports = function restricted(req, res, next) {
  if (req.session && req.session.username) {
    next();
  } else {
    res.status(400).json({ message: "Please Provide some creds maN" });
  }
};
