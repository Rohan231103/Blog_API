const adminmodel = require("../model/adminlogin");
const bcrypt = require("bcrypt");
const storage = require("node-persist");
const addblog = require("../model/addblog");
const cat = require("../model/category");
const blogger = require("../model/blogger");
storage.init(/* options ... */);

// Add Admin
// exports.insert = async(req,res) => {
//     const b_pass = await bcrypt.hash(req.body.password,10);
//     req.body.password=b_pass;
//     const data=await adminlogin.create(req.body)
//     res.status(200).json({
//         status:"Data insert"
//     })
// }

exports.adminlogin = async (req, res) => {
  const data = await adminmodel.find({ email: req.body.email });
  const login_status = await storage.getItem("admin_id");

  if (login_status == undefined) {
    if (data.length == 1) {
      bcrypt.compare(
        req.body.password,
        data[0].password,
        async function (err, result) {
          if (result == true) {
            await storage.setItem("admin_id", data[0].id);
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
      status: "Admin is already login",
    });
  }
};

// Admin Logout
exports.adminlogout = async (req, res) => {
  await storage.removeItem("admin_id");
  res.status(200).json({
    status: "Admin Logout",
  });
};

/*===================================
               Blog
===================================*/

exports.addblog = async (req, res) => {
  const login_status = await storage.getItem("admin_id");

  if (login_status != undefined) {
    await addblog.create(req.body);

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
  const login_status = await storage.getItem("admin_id");

  if (login_status != undefined) {
    const data = await addblog.find();

    res.status(200).json({
      data,
    });
  } else {
    res.status(200).json({
      status: "Please Login!",
    });
  }
};

exports.editblog = async (req, res) => {
  const login_status = await storage.getItem("admin_id");

  if (login_status != undefined) {
    const id = req.params.id;

    const existingData = await addblog.find(req.body);
    const __v = await existingData[0].__v;

    let sta;
    if (__v == 0) {
      sta = "Pending";
    } else if (__v == 1) {
      sta = "Accepted";
    } else if (__v == 2) {
      sta = "Decline";
    }

    req.body.sta = sta;

    await addblog.findByIdAndUpdate(id, req.body);

    res.status(200).json({
      status: "Blog Updated",
      newStatus: sta,
    });
  } else {
    res.status(200).json({
      status: "Please Login!",
    });
  }
};

exports.deleteblog = async (req, res) => {
  const login_status = await storage.getItem("admin_id");

  if (login_status != undefined) {
    const id = req.params.id;
    await addblog.findByIdAndDelete(id);

    res.status(200).json({
      status: "Blog Deleted !",
    });
  } else {
    res.status(200).json({
      status: "Please Login!",
    });
  }
};

/*===================================
            category
===================================*/

exports.cat = async (req, res) => {
  const login_status = await storage.getItem("admin_id");

  if (login_status != undefined) {
    await cat.create(req.body);

    res.status(200).json({
      status: "Category Added",
    });
  } else {
    res.status(200).json({
      status: "Please Login!",
    });
  }
};

exports.viewcat = async (req, res) => {
  const login_status = await storage.getItem("admin_id");

  if (login_status != undefined) {
    const data = await cat.find();

    res.status(200).json({
      data,
    });
  } else {
    res.status(200).json({
      status: "Please Login!",
    });
  }
};

exports.deletecat = async (req, res) => {
  const login_status = await storage.getItem("admin_id");

  if (login_status != undefined) {
    const id = req.params.id;
    await cat.findByIdAndDelete(id);

    res.status(200).json({
      status: "Category Deleted !",
    });
  } else {
    res.status(200).json({
      status: "Please Login!",
    });
  }
};

exports.editcat = async (req, res) => {
  const login_status = await storage.getItem("admin_id");

  if (login_status != undefined) {
    const id = req.params.id;
    await cat.findByIdAndUpdate(id, req.body);

    res.status(200).json({
      status: "Category Updated !",
    });
  } else {
    res.status(200).json({
      status: "Please Login!",
    });
  }
};

/*===================================
            Blogger
===================================*/

exports.addblogger = async (req, res) => {
  const login_status = await storage.getItem("admin_id");

  if (login_status != undefined) {
    const b_pass = await bcrypt.hash(req.body.password, 10);
    req.body.password = b_pass;

    await blogger.create(req.body);

    res.status(200).json({
      status: "Blogger Added",
    });
  } else {
    res.status(200).json({
      status: "Please Login!",
    });
  }
};

exports.viewblogger = async (req, res) => {
  const login_status = await storage.getItem("admin_id");

  if (login_status != undefined) {
    const data = await blogger.find();

    res.status(200).json({
      data,
    });
  } else {
    res.status(200).json({
      status: "Please Login!",
    });
  }
};

exports.editblogger = async (req, res) => {
  const login_status = await storage.getItem("admin_id");

  if (login_status != undefined) {
    const id = req.params.id;
    await blogger.findByIdAndUpdate(id, req.body);

    res.status(200).json({
      status: "Blogger Updated !",
    });
  } else {
    res.status(200).json({
      status: "Please Login!",
    });
  }
};

exports.deleteblogger = async (req, res) => {
  const login_status = await storage.getItem("admin_id");

  if (login_status != undefined) {
    const id = req.params.id;
    await blogger.findByIdAndDelete(id);

    res.status(200).json({
      status: "Blogger Deleted !",
    });
  } else {
    res.status(200).json({
      status: "Please Login!",
    });
  }
};
