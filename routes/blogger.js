const express = require("express");
const router = express.Router();
const blogger = require("../controller/bloggercontroller");

router.post("/bloggerlogin", blogger.bloggerlogin);
router.get("/bloggerlogout", blogger.bloggerlogout);

// blogger blog
router.post("/addblog", blogger.addblog);
router.get("/viewblog", blogger.viewblog);
router.post("/manageblog/:id", blogger.manageblog);

module.exports = router;
