const jwt = require("../services/jwt");
const moment = require("moment");
const User = require("../models/user");

function willExpiredToken(token)
{ 
    const {exp}=jwt.decodedToken(token)
    const currentDate = moment().unix();

    if( currentDate>exp)
    {
        return true;
    }
    
        return false;
    

}

function refreshAccessToken(req, res) 
 {
     const {refreshToken}=req.body;
     const isTokenExpired=willExpiredToken(refreshToken);
     if(isTokenExpired)
     {
         res.statur(404).send({message:"El refresh token esta expirado"});

     }
     else{
         const{id}=jwt.decodedToken(refreshToken);
         User.findOne({_id:id},(err,userStorage)=>
         {
             if(err)
             {
                 res.status(500).send({message:"Error en el servidor"});
             }
             else
             {
                 if(!userStorage)
                 {
                    res.status(500).send({message:"El usuario no existe"});
                 }
                 else{
                     res.status(200).send({
                        accessToken:jwt.createAccessToken(userStorage),
                        refreshToken:refreshToken
                     })
                    
                 } 
             }
         })
     }
 }
 module.exports = {
    refreshAccessToken
  };
