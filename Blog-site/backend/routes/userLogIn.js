const express = require('express')
const router = express.Router()


//middleware for saving photos
const upload = require('../utils/upload')


//don't forget to import the API callbacks/ actions
const {postSignUp, postLogIn, uploadFile, getUploadedImage, createPost, getAllPosts, getPostById, updatePost, deleteBlog} = require('../controller/ApiActions')
const {authorizeToken} = require('../utils/authorizeToken')


// signup (create new user)
router.post('/signUp', postSignUp)

// login (use exisiting user)
router.post('/logIn', postLogIn)

//upload files/photos
router.post('/file/upload',upload.single('file'), uploadFile)

//get the upload photos to show in cover area
//this will be called when app returns some url of form  /file/:filename, this is returned by upload
router.get('/file/:filename', getUploadedImage);

//save created post to db
router.post('/create', authorizeToken ,createPost)

//fetch the posts thats saved in db
router.get('/posts', authorizeToken, getAllPosts)

//fetch the selected blog from user
router.get('/detail/:id', authorizeToken, getPostById)

//update the blog
router.put('/update/:id', authorizeToken, updatePost)

//delete the post
router.delete('/delete/:id', authorizeToken, deleteBlog)



module.exports = router