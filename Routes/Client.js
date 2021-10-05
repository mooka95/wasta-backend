const express = require('express');
const router = express.Router();
const Client=require("../Model/Client");
const CheckEmail=require("../middlewares/CheckEmail");
const isAdminAuthorized = require('../middlewares/isAdminAuthorized');
const CheckSubscription = require('../middlewares/CheckSubscription');
const Service= require('../Model/Service');

router.put('/',CheckEmail,CheckSubscription, async (req,res,next)=>{
   if(req.body.subscribedService){
       console.log(req.body.fullName);
    const updatedDocument= await Client.findOneAndUpdate({_id:req.client.id},{$addToSet:{subscribedService:req.body.subscribedService}});
       console.log(updatedDocument);
   }  
   if(req.body.question){
    const updatedDocument= await Client.findOneAndUpdate({id:req.client.id},{$addToSet:{question:req.body.question}});
       console.log( updatedDocument);

   }


})


router.get('/allclients',isAdminAuthorized, async (req,res,next)=>{
    const clients= await Client.find({});
    // const subscribedServices= await Client.find({},{"subscribedService":1});


 
    res.status(200).json({
        clients
   
        
    })





})
module.exports=router