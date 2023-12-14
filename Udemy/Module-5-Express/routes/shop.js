const path = require("path");
const express = require("express");

const router = express.Router();

const rootDir = require("../utils/path");

router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "shop.html"));
  //   res.send("<h1>Hello from Express!</h1>");
});

module.exports = router;
