const express = require('express')
const router = express.Router()


//import middleware
const upload = require('../middleware/upload')

//import the API-action
const {savePost, saveImage, getUploadedImage} = require('../controller/API_action')




//save post
router.post('/savePost', savePost)

//saveImage
router.post('/saveImage', upload.array('photos') ,saveImage)

//get saved image
router.get('/file/:filename', getUploadedImage)


module.exports = router