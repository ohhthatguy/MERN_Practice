const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
 
const authorizeToken = (req,res,next)=>{

    const authHeader = req.headers['authorization']
    
    if(authHeader){
        const token =  authHeader.split(' ')[1]

        if(token == null){
            return res.status(401).json({msg: "token is missing"})
        }

        jwt.verify(token, process.env.SECRET_ACCESS_KEY, (error,user)=>{
                if(error){
                    return res.status(403).json({msg: 'invalid/expired token'})
                }

                req.user = user
        })
        next()

    }

 }

 module.exports = {authorizeToken}