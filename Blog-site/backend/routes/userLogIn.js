const express = require('express')
const router = express.Router()

//middleware for saving photos
const upload = require('../utils/upload')

//don't forget to import the API callbacks/ actions
const {postSignUp, postLogIn, uploadFile, getUploadedImage} = require('../controller/ApiActions')


// signup (create new user)
router.post('/signUp', postSignUp)

// login (use exisiting user)
router.post('/logIn', postLogIn)

//upload files/photos
router.post('/file/upload',upload.single('file'), uploadFile)

//get the upload photos to show in cover area
//this will be called when app returns some url of form  /file/:filename, this is returned by upload
router.get('/file/:filename', getUploadedImage);



module.exports = router