const express = require('express');

const router = express.Router();
const Admin =require("../Model/Admin")
const CustomError=require('../helpers/CustomError');
const isAdminAuthorized = require('../middlewares/isAdminAuthorized');

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