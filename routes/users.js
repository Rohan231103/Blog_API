const express = require("express");
const router = express.Router();
const user = require("../controller/usercontroller");

router.get("/viewblog", user.viewblog);

module.exports = router;
