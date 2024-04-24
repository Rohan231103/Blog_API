var express = require('express');
var router = express.Router();
var blogger = require('../controller/bloggercontroller');


router.post('/bloggerlogin',blogger.bloggerlogin);    // Blooger Login
router.get('/bloggerlogout',blogger.bloggerlogout);  // Blogger Logout


// blogger blog
router.post('/addblog',blogger.addblog);    // add blog
router.get('/viewblog',blogger.viewblog);    // view blog
router.post('/manageblog/:id',blogger.manageblog);    // add blog


module.exports = router;
