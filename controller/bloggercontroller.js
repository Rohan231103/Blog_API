const bcrypt = require("bcrypt");
const bloggermodel = require("../model/blogger");
const bloggerblog = require("../model/addblog");
const storage = require("node-persist");
storage.init(/* options ... */);

exports.bloggerlogin = async (req, res) => {
  const data = await bloggermodel.find({ email: req.body.email });
  const login_status = await storage.getItem("blogger_id");

  if (login_status == undefined) {
    if (data.length == 1) {
      bcrypt.compare(
        req.body.password,
        data[0].password,
        async function (err, result) {
          if (result == true) {
            // login_status=1;
            await storage.setItem("blogger_id", data[0].id);
            res.status(200).json({
              status: "Login Success",
            });
          } else {
            res.status(200).json({
              status: "Check your Email and Password",
            });
          }
        }
      );
    } else {
      res.status(200).json({
        status: "Check your Email and Password",
      });
    }
  } else {
    res.status(200).json({
      status: "Blogger is already login",
    });
  }
};

exports.bloggerlogout = async (req, res) => {
  await storage.removeItem("blogger_id");
  res.status(200).json({
    status: "Blogger Logout",
  });
};

/*===================================
               Blog
===================================*/

exports.addblog = async (req, res) => {
  const login_status = await storage.getItem("blogger_id");

  if (login_status != undefined) {
    await bloggerblog.create(req.body);

    res.status(200).json({
      status: "Blog Added",
    });
  } else {
    res.status(200).json({
      status: "Please Login!",
    });
  }
};

exports.viewblog = async (req, res) => {
  const login_status = await storage.getItem("blogger_id");

  if (login_status != undefined) {
    const data = await bloggermodel.find({ email: req.body.email });
    if (data.length > 0) {
      const authorName = data[0].name; // Assuming 'name' is the author field
      var get_blog = await bloggerblog.find({ author: authorName });

      await bloggerblog.find({ author: data[0].name });

      if (get_blog.length > 0) {
        res.status(200).json({
          get_blog,
        });
      } else {
        res.status(200).json({
          status: "Blog Not Uploded",
        });
      }
    } else {
      res.status(200).json({
        status: "No blogger found with this email",
      });
    }
  } else {
    res.status(200).json({
      status: "Please Login",
    });
  }
};

exports.manageblog = async (req, res) => {
  try {
    const login_status = await storage.getItem("blogger_id");

    if (!login_status) {
      return res.status(200).json({
        status: "Please Login!",
      });
    }

    const id = req.params.id;
    const existingData = await bloggerblog.find({ _id: id });

    if (!existingData || existingData.length === 0) {
      return res.status(404).json({
        status: "Blog not found",
      });
    }

    const __v = existingData[0].__v;
    let sta = "Unknown";

    if (__v === 0) {
      sta = "Pending";
    } else if (__v === 1) {
      sta = "Accepted";
    } else if (__v === 2) {
      sta = "Declined";
    }

    const updatedData = await bloggerblog.findByIdAndUpdate(
      id,
      { ...req.body, sta },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({
        status: "Blog update failed",
      });
    }

    res.status(200).json({
      status: "Blog Updated",
      newStatus: sta,
    });
  } catch (error) {
    console.error("Error in manageblog:", error);
    res.status(500).json({
      status: "Internal Server Error",
    });
  }
};
