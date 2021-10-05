const mongoose = require('mongoose');
const { mongoURI }=require('./config');

mongoose.connect(mongoURI,{useNewUrlParser: true, useUnifiedTopology: true})