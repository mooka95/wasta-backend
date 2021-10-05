const mongoose = require('mongoose');



const ClientSchema =   new mongoose.Schema({
    email: {
        type: String, required:true,
        unique:true},
    fullName:{
        type:String,
        required: true
    },
    phoneNumber:{
         type:String,
         required:true,
      
    },
    question:{
     type:Array,

    },
    subscribedService:{
        type:Array
    }
 
    
  },{toJSON : {
    transform:function(doc,ret){
        
        delete ret.__v
    }
  }
  });
  ClientSchema.pre('save',async function(){
    if(!this.isModified('subscribedService')){
        this.subscribedServiceId=undefined;
    }
    if(!this.isModified('question')){
        this.question=undefined;
    }

  })

  const client=mongoose.model('clients',ClientSchema);
  module.exports=client;