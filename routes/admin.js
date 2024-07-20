const express = require("express");
const router = express.Router();
const admin = require("../controller/admincontroller");

// Admin Add
// router.post('/add', admin.insert);

// Admin Login
router.post("/adminlogin", admin.adminlogin);
router.get("/adminlogout", admin.adminlogout);

// Blog
router.post("/addblog", admin.addblog);
router.get("/viewblog", admin.viewblog);
router.post("/editblog/:id", admin.editblog);
router.get("/deleteblog/:id", admin.deleteblog);

// Category
router.post("/addcat", admin.cat);
router.get("/viewcat", admin.viewcat);
router.get("/deletecat/:id", admin.deletecat);
router.post("/editcat/:id", admin.editcat);

// Blogger
router.post("/addblogger", admin.addblogger);
router.get("/viewblogger", admin.viewblogger);
router.post("/editblogger/:id", admin.editblogger);
router.get("/deleteblogger/:id", admin.deleteblogger);

module.exports = router;
