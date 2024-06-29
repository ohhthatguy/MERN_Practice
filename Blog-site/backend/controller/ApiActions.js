const User = require('../model/userLogIn')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config();
const Token = require('../model/token');
const grid = require('gridfs-stream')
const mongoose = require('mongoose')
const Post = require('../model/post')
const Comment = require('../model/comment')


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


const createPost = async(req,res)=>{
    try{
        const post =  new Post(req.body)
        await post.save()
        return res.status(200).json({msg: "post saved in db"})

    }catch(err){
        return res.status(500).json({msg: "post could be saved in db", error: err})

    }
    
}

const getAllPosts = async(req,res)=>{
    let category = req.query.category;
    // console.log(req)
    let posts;
    try{
        if(category){
            posts = await Post.find({category: category})
        }else{
            posts = await Post.find({})
        }
        // posts = await Post.find({})
        return res.status(200).json(posts)

    }catch(err){
        return res.status(500).json({msg: `following error occured while fetching posts: ${err}`})
    }
}

const getPostById = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        return res.status(200).json(post)


    }catch(err){
        return res.status(500).json({msg: `error is givena as, ${err}`})

    }
}

const updatePost = async(req,res)=>{
    try{
        let response = await Post.findById(req.params.id)

        if(!response){
            return res.status(404).json({msg: 'searched data not found to update'})
        }

        await Post.findByIdAndUpdate(req.params.id, {
            $set: req.body
        })

        return res.status(200).json({msg: 'post updated successfully'})
    }catch(err){
        return res.status(500).json({msg: `error while updating, ${err}`})
    }
}

const deleteBlog = async(req,res)=>{
    try{

        let response = await Post.findById(req.params.id)

        if(!response){
            return res.status(404).json({msg: "data to delete is not in database"})
        }

        await Post.deleteOne({_id: req.params.id})
        return res.status(200).json({msg: "data is delete successfully"})

    }catch(err){
        return res.status(500).json({msg: "error while deleting the blog is, " + err})
        

    }


}

const postComment = async(req,res)=>{
    try{
        let data = new Comment(req.body)
        await data.save()

        return res.status(200).json({msg: "comment saved succesfully"})
    }catch(err){
        return res.status(500).json({msg: `problem while saving commnets, ${err}`})
        
    }


}

const getAllComments = async(req,res)=>{
    try{
        let comments = await Comment.find({postId: req.params.id})
        // let comments = await Comment.findById(req.params.id)

        if(!comments){
            return res.status(404).json({msg: "comment not found"})
        }
        return res.status(200).json(comments)
    }catch(err){
        return res.status(500).json({msg: `problem while fetching comments, ${err}`})

    }
    

}

const deleteComment=async(req,res)=>{
    try{

        let response = await Comment.findById(req.params.id)

        if(!response){
        return res.status(404).json({msg: `comment of given id not found`})
        }

        await Comment.deleteOne({_id: req.params.id})
        return res.status(200).json({msg: "data is delete successfully"})

    }catch(err){
        return res.status(500).json({msg: `some error in backend while deleting comment, ${err}`})
    }
}

module.exports = { postSignUp, postLogIn, uploadFile, getUploadedImage, createPost, getAllPosts, getPostById, updatePost, deleteBlog, postComment, getAllComments, deleteComment };