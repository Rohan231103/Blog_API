var express = require('express');
var router = express.Router();
var user = require('../controller/usercontroller');


router.get('/viewblog', user.viewblog);

module.exports = router;
