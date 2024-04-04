var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("app.js return index.html");
  res.sendFile(path.join(__dirname, '../../dist/tupper/browser/index.html'));
});

module.exports = router;