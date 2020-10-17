var express = require("express");
var router = express.Router();

router.get("/route1", function (req, res, next) {
  res.json({ test: "test" });
});

router.get("/route2", function (req, res, next) {
  res.json({ test: "test2" });
});

module.exports = router;
