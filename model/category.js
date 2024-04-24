var mongoose = require('mongoose');

//Admin Login
var catschema = new mongoose.Schema({
    category:{
        type:String,
    },
    created:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("category",catschema);