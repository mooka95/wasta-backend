const express = require('express');
const app = express();
require('express-async-errors');
const { port } =  require('./config');
const cors = require('cors')
require('./db')

app.use(express.json());



const adminRoute=require('./Routes/Admin');
const clientRoute=require('./Routes/Client');
const serviceRoute=require('./Routes/Service')
app.use(cors());

app.use('/Images' , express.static('Images'));

app.get('/', (req, res) => {
  
  res.send('Hello Worssld!')  
})
app.use(['/client','/Client','/clients'],clientRoute);
app.use(['/admin','/admins'],adminRoute);
app.use(['/service','services'],serviceRoute)

app.use((err,req,res,next)=>{
  err.statusCode=err.statusCode|| 500;
  const handleError=err.statusCode<500 ? err.message :'Something Went Wrong';
  res.status(err.statusCode).json({
    message:handleError,
    errors:err.errors || {}
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});