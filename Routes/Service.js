const express = require('express');
const isAdminAuthorized = require('../middlewares/isAdminAuthorized');
const router= express.Router();
const Service=require('../Model/Service');


router.post('/',async (req,res,next)=>{

const service=new Service(req.body);
const addedService= await service.save();
res.status(200).json({
   "message":"Service Added Succesfully"
})


})

router.get('/',async (req,res,next)=>{
  const services= await Service.find({});

  res.status(200).json({
      services
  })

})

router.get('/id',async (req,res,next)=>{

const serviceId=req.headers.id;
const service= await Service.findById(serviceId);
res.status(200).json({
    service
});



})




module.exports=router;