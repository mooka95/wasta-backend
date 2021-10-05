
const Client=require('../Model/Client')


module.exports=(async(req,res,next)=>{ 


const client= await Client.findOne({email:req.body.email});
if(client){

    req.client=client;
    next();

}
else{
    const clientBody= new Client(req.body) ;
  
    await clientBody.save();
    res.status(200).json({
        "message":"Client Saved Succesfully"
    })
}






})