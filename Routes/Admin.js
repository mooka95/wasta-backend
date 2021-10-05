const express = require('express');
const isAdminAuthorized = require('../middlewares/isAdminAuthorized');
const router = express.Router();
const Admin =require("../Model/WebsiteAdmin")
const CustomError=require('../helpers/CustomError')

router.post('/',isAdminAuthorized,async (req,res,next)=>{
    const admin = new Admin(req.body);
    const adminSaved= await admin.save();


   res.status(200).json({
       "message":"Admin Saved Succesfully"
   })


});

router.post('/login',async (req,res,next)=>{
    const admin=  await Admin.findOne({email:req.body.email});
      if(!admin){
         throw  new CustomError("Wrong userName or password",401);
      }
      const isMatch= await  admin.checkPassword(req.body.password);
      if(!isMatch){
         
            throw new CustomError("Wrong userName or password",401);
      }
      const token = await  admin.generateToken();
      admin.token=token

      

      res.json({
          admin
      })




})
router.get('/',(req,res,next)=>{
    res.send('admin')
})

module.exports=router