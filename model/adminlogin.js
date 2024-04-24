var mongoose = require('mongoose');

//Admin Login
var adminschema = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    }
});

module.exports = mongoose.model("admin",adminschema);