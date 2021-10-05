const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {  saltRounds, jwtSecret }=require('../config');
const util = require('util');
const jwt = require('jsonwebtoken');
const signJwt=util.promisify(jwt.sign);
const verifyJwt=util.promisify(jwt.verify);

const AdminSchema =  new mongoose.Schema({
    email: {
        type: String,
         required:true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    token:{
      type:String
    },
 
 
    
  },{toJSON : {
    transform:function(doc,ret){
        delete ret.password,
        delete ret.__v
    }
  }
  });

  AdminSchema.pre('save',async function(){

  if(this.isModified('password')){
    this.password= await bcrypt.hash(this.password,saltRounds);

  }})

  AdminSchema.methods.checkPassword=async function (plainPassword){
    return bcrypt.compare(plainPassword,this.password);

  }
  AdminSchema.methods.generateToken= async function(){
   
    return signJwt({id:this.id},jwtSecret,{expiresIn:'1h'});
   
}
AdminSchema.statics.getAdminFromToken= async function(token){

  
  const { id }  =  await verifyJwt(token,jwtSecret);
  const admin= await this.findById(id);
 
     return admin;
}

  const admin=mongoose.model('admins',AdminSchema);
  module.exports=admin;