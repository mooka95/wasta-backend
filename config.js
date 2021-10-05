require('dotenv').config();
const requiredEnvs= ['MONGO_URI','JWT_SECRET'];
const missingEnvs= requiredEnvs.filter(envName=>!process.env[envName]);

if(missingEnvs.length)
throw new Error(`missing Required envs ${missingEnvs}`);
module.exports= {
    saltRounds:process.env.SALT_ROUNDS ||7,
    jwtSecret:process.env.JWT_SECRET,
    mongoURI : process.env.MONGO_URI,
    port:process.env.PORT || 3000 
}