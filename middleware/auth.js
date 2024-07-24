const jwt = require('jsonwebtoken')
require('dotenv').config();
//const config = require('config')


module.exports = function(req, res ,next){
    //Get token from header
    const token = req.header('x-auth-token')

    //Chek if not token
    if(!token){
        return res.status(401).json({msg : 'No token, authorization denied'})
    }

    //verify token
    try{
        const decoded = jwt.verify(token, process.env.jwtSecret)

        req.seller = decoded.seller;
        next();
    }catch(err){
        res.status(401).json({msh : 'Token is not valid'})
    }
}
