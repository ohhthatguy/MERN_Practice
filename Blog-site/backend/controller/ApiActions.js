const User = require('../model/userLogIn')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config();
const Token = require('../model/token');
const grid = require('gridfs-stream')
const mongoose = require('mongoose')


//dont forget to export at last

const postSignUp = async(req,res) =>{
    console.log("im here")
    try{
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const hashedUser = {email: req.body.email, name: req.body.name, password: hashedPassword}

        const newUser = new User(hashedUser) //put the data into user schema
        await newUser.save() //save to db
        
        return res.status(200).json({
            msg: "data is saved to db"
        })
 
    }catch(err){
        return res.status(500).json({
            msg: "data failed to save"
        })

    }
}

const postLogIn = async(req,res)=>{
    let validUser = await User.findOne({email: req.body.email})
    
    if(!validUser){
        return res.status(404).json({msg: `user of such email doesn't exist`})
    }

    //but if user with the given email exists

    try{
                                           //user send pswrd    // pswrd corresponding with email 
        let isValid = await bcrypt.compare(req.body.password, validUser.password)
       
        if(isValid){ //if password is also right, user is valid and create token
            const accessToken = jwt.sign(validUser.toJSON(), process.env.SECRET_ACCESS_KEY, { expiresIn: '15m' })
            const refreshToken = jwt.sign(validUser.toJSON(), process.env.SECRET_REFRESH_KEY)

            const newToken = new Token({token:refreshToken})
            await newToken.save()

            //after confirming the valid user and also saving the token return back the accesstoken, refershtoken, name and email to frontend for us to use it
            return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken, name: validUser.name, email: validUser.email})

        }else{
            return res.status(400).json({msg: `Password doesn't match !`})
        }


    }catch(err){
        return res.status(500).json({msg: `error while login in with data`})
    }
}

const uploadFile = async(req,res)=>{

    if(!req.file){
        return res.status(404).json({msg: "no file were found to send to server"})
    }

    const imgUrl = `http://localhost:5000/file/${req.file.filename}`
    console.log(imgUrl)
    return res.status(200).json(imgUrl)

}


let gfs, gridfsBucket
const cons1 = mongoose.connection
cons1.once('open', ()=>{
    gridfsBucket = new mongoose.mongo.GridFSBucket(cons1.db,{
        bucketName: 'photos' 
    })
    gfs = grid(cons1.db, mongoose.mongo)
    gfs.collection('photos')
})

const getUploadedImage = async(req,res)=>{
    const filename= req.params.filename
    try{
        const file = await gfs.files.findOne({ filename })
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
      
    }catch(err){
        return res.status(500).json({msg: `photo's been uploaded but fetching to show is showing error.`, err})
    }

}

module.exports = { postSignUp, postLogIn, uploadFile, getUploadedImage };