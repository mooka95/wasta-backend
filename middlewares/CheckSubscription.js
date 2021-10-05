const CustomError = require("../helpers/CustomError");

module.exports=async (req,res,next)=>{

   if(req.body.subscribedService!==undefined){
      const found=  req.client.subscribedService?.find(element => element._id === req.body.subscribedService._id);
 if(found){
    const error= new CustomError('You Already Subscribed To this Service',409);
    throw error;
 }
 else
 next();
   }
   else{
      next();
   }

 
 






}