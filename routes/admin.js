var express = require('express');
var router = express.Router();
var admin = require('../controller/admincontroller');

// Admin Add
// router.post('/add', admin.insert);

// Admin Login
router.post('/adminlogin',admin.adminlogin);
router.get('/adminlogout',admin.adminlogout);  // Admin Logout

// Blog
router.post('/addblog',admin.addblog);    // Add Blog
router.get('/viewblog',admin.viewblog)    // View Blog
router.post('/editblog/:id',admin.editblog);  // Update Blog
router.get('/deleteblog/:id',admin.deleteblog);  // Delete Blog

// Category
router.post('/addcat',admin.cat)      //Add Category
router.get('/viewcat',admin.viewcat)      //view Category
router.get('/deletecat/:id',admin.deletecat)      //Delete Category
router.post('/editcat/:id',admin.editcat)      //Add Category

// Blogger
router.post('/addblogger',admin.addblogger);    //Add Blogger
router.get('/viewblogger',admin.viewblogger);      //view Blogger
router.post('/editblogger/:id',admin.editblogger);    //Edit Blogger
router.get('/deleteblogger/:id',admin.deleteblogger);    //Delete Blogger


module.exports = router;
