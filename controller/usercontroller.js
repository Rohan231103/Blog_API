var viewblog=require('../model/addblog')

exports.viewblog=async(req,res)=>{
    var data=await viewblog.find({"__v":"1"})
    
    if(data.length>0){
        res.status(200).json({
            data
        })
    }else{
        res.status(200).json({
            status:"Blog Not Found"
        })
    }
}