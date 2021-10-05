const Admin = require("../Model/Admin");
const CustomError= require('../helpers/CustomError')

module.exports= async (req,res,next)=>{



    const authnticatin=req.headers.authorization;
    if(!authnticatin){
     const error=new CustomError("please login first",401);
     throw error;
    }
     req.admin= await Admin.getAdminFromToken(authnticatin);
  

    if(!req.admin) {
        const error=new CustomError("please login first",401);
       throw error;
    }

    next();










}