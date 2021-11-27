const express = require('express');
const isAdminAuthorized = require('../middlewares/isAdminAuthorized');
const router= express.Router();
const Service=require('../Model/Service');
const path = require('path');

const multer  = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Images')
  },
  filename: function (req, file, cb) {
   
    cb(null,  Date.now()+path.extname(file.originalname) );
  }
})
const upload = multer({ storage: storage })


router.post('/',upload.single('imageUrl'),async (req,res,next)=>{
  console.log(req.file)
  console.log(req.body)

const service=new Service({
  title:req.body.title,
  description:req.body. description,
  price:req.body.price,
  imageUrl:req.file.path
});
const addedService= await service.save();
res.status(200).json({
  addedService,
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