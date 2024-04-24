var adminmodel = require('../model/adminlogin');
const bcrypt = require('bcrypt');
const storage = require('node-persist');
const adminlogin = require('../model/adminlogin');
const addblog = require('../model/addblog');
const cat = require('../model/category');
const category = require('../model/category');
const blogger = require('../model/blogger');
storage.init( /* options ... */ );


// Add Admin
// exports.insert = async(req,res) => {
//     var b_pass = await bcrypt.hash(req.body.password,10);
//     req.body.password=b_pass;
//     var data=await adminlogin.create(req.body)
//     res.status(200).json({
//         status:"Data insert"
//     })
// }

// var login_status = "";

exports.adminlogin = async (req,res) => {
    var data = await adminmodel.find({"email":req.body.email});
    var login_status = await storage.getItem('admin_id');

    if(login_status == undefined)
    {
        if(data.length==1)
        {
            bcrypt.compare(req.body.password, data[0].password, async function(err, result){
                if(result==true)
                {
                    // login_status=1;
                    await storage.setItem('admin_id', data[0].id)
                    res.status(200).json({
                        status:"Login Success"
                    })
                }
                else{
                    res.status(200).json({
                        status:"Check your Email and Password"
                    })
                }
            })
        }
        else{
            res.status(200).json({
                status:"Check your Email and Password"
            })
        }
    }
    else{
        res.status(200).json({
            status:"Admin is already login"
        })
    }
}

// Admin Logout
exports.adminlogout = async(req,res) => {
    await storage.removeItem('admin_id');
    // login_status = 0;
    res.status(200).json({
        status: "Admin Logout"
    })
}

/*===================================
               Blog
===================================*/

// Blog Add
exports.addblog = async(req,res) => {
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined) {
        var data = await addblog.create(req.body);

        res.status(200).json({
            status:"Blog Added"
        })
    }
    else{
        res.status(200).json({
            status:"Please Login!"
        })
    }
}

// View Blog
exports.viewblog = async(req,res) => {
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined) {
        var data = await addblog.find();

        res.status(200).json({
            data
        })
    }
    else{
        res.status(200).json({
            status:"Please Login!"
        })
    }
}

// Update Blog
exports.editblog = async(req,res) => {
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined) {
        var id = req.params.id;

        var existingData = await addblog.find(req.body);
        var __v = await existingData[0].__v;

        var sta;
        if(__v == 0){
            sta = "Pending";
        }else if (__v == 1){
            sta = "Accepted";
        }else if (__v == 2){
            sta = "Decline";
        }

        req.body.sta = sta;

        var data = await addblog.findByIdAndUpdate(id,req.body);

        res.status(200).json({
            status:"Blog Updated",
            newStatus : sta
        })
    }
    else{
        res.status(200).json({
            status:"Please Login!"
        })
    }
}

// Delete Blog
exports.deleteblog = async(req,res) => {
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined) {
        var id = req.params.id;
        var data = await addblog.findByIdAndDelete(id);

        res.status(200).json({
            status:"Blog Deleted !"
        })
    }
    else{
        res.status(200).json({
            status:"Please Login!"
        })
    }
}

/*===================================
            category
===================================*/

// Category Add
exports.cat = async(req,res) => {
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined) {
        var data = await cat.create(req.body);

        res.status(200).json({
            status:"Category Added"
        })
    }
    else{
        res.status(200).json({
            status:"Please Login!"
        })
    }
}

// Catregory View 
exports.viewcat = async(req,res) => {
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined) {
        var data = await cat.find();

        res.status(200).json({
            data
        })
    }
    else{
        res.status(200).json({
            status:"Please Login!"
        })
    }
}

// Category Delete
exports.deletecat = async(req,res) => {
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined) {
        var id = req.params.id;
        var data = await cat.findByIdAndDelete(id);

        res.status(200).json({
            status:"Category Deleted !"
        })
    }
    else{
        res.status(200).json({
            status:"Please Login!"
        })
    }
}

// Update Category
exports.editcat = async(req,res) => {
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined) {
        var id = req.params.id;
        var data = await cat.findByIdAndUpdate(id,req.body);

        res.status(200).json({
            status:"Category Updated !"
        })
    }
    else{
        res.status(200).json({
            status:"Please Login!"
        })
    }
}

/*===================================
            Blogger
===================================*/

//Add Bloger
exports.addblogger = async(req,res) => {
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined) {
        var b_pass = await bcrypt.hash(req.body.password,10);
        req.body.password=b_pass;
        var data = await blogger.create(req.body);

        res.status(200).json({
            status:"Blogger Added"
        })
    }
    else{
        res.status(200).json({
            status:"Please Login!"
        })
    }
}

// View Blogger
exports.viewblogger = async(req,res) => {
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined) {
        var data = await blogger.find();

        res.status(200).json({
            data
        })
    }
    else{
        res.status(200).json({
            status:"Please Login!"
        })
    }
}

// Edit Blogger
exports.editblogger = async(req,res) => {
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined) {
        var id = req.params.id;
        var data = await blogger.findByIdAndUpdate(id,req.body);

        res.status(200).json({
            status:"Blogger Updated !"
        })
    }
    else{
        res.status(200).json({
            status:"Please Login!"
        })
    }
}

// Delete Blog
exports.deleteblogger = async(req,res) => {
    var login_status = await storage.getItem('admin_id');

    if(login_status != undefined) {
        var id = req.params.id;
        var data = await blogger.findByIdAndDelete(id);

        res.status(200).json({
            status:"Blogger Deleted !"
        })
    }
    else{
        res.status(200).json({
            status:"Please Login!"
        })
    }
}