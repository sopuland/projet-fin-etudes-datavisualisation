/* Modules imports */
var express = require('express');
var router = express.Router();

/* Controllers imports */
var catalog = require('../controllers/displayDevice');

/* POST find device. */
router.post('/', function(req, res) {
    catalog.displayDevice(req, res);
});

module.exports = router;
