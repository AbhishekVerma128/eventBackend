const jwt = require("jsonwebtoken")
const secret = "secretForVendors"
const vendor = require("../model/VendorSchema")

module.exports = async (req, res,next)=>{
    const {authorization} = req.headers;
    console.log(req.headers);
    if(!authorization){
        return res.status(401).json({error:"you must have login"})
    }
   else{
    const token = authorization.replace("Bearer ", "");

    // console.log(token);
    
    await jwt.verify(token, secret, async (err,payload)=>{
        if(err){
            return res.status(401).json({error:"you must have login"})
        }
       else{
        const {data}= payload;
        console.log(data);
        const userdata = await vendor.findOne({contact:data});
        // console.log(userdata);
        if(userdata){
            req.user = userdata
        }
       }
    })
   }
    next() 
}