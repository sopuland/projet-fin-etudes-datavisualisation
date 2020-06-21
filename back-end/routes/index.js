/* Modules imports */
var express = require('express');
var router = express.Router();

/* Controllers imports */
//var index = require('../controllers/index');

/* GET home page. */
router.get('/', function(req, res) {
  index.message(req, res);
});

module.exports = router;
