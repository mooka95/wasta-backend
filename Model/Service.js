const mongoose = require('mongoose');
const ServiceSchema = new mongoose.Schema({
    title: {
        type: String, required:true,
        unique:true
    
    },
    description:{
        type:String,
        required:true,
        unique:true
    },

    price:{
        type:Number,
        required:true,
    
    },
    imageUrl:{
      type:String 
    }
    
  },{
      toJSON:{
          transform:function(doc,ret){
            delete ret.__v
          }
      }
  });

  const service=mongoose.model('services',ServiceSchema);
  module.exports=service;