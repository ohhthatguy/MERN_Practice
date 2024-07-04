const multer = require('multer')
const {GridFsStorage} = require('multer-gridfs-storage')
const mongoose = require('mongoose')

const dotenv = require('dotenv').config()



const storage = new GridFsStorage({
    url: process.env.DB_NAME,
    file: (req,file)=>{
        // console.log(file)
        const match = ['image/png','image/jpg','image/jpeg']
        // console.log(file)
        if(match.indexOf(file.mimetype) === -1){
            return `${Date.now()}-Blog-${file.originalname}`
        }

        //if file has right extension then save in photos.xyz i.e. bucketname
        return {
            bucketName: 'photos',
            filename: `${Date.now()}-Blog-${file.originalname}`
        }
    }
    
})



const upload = multer({ storage })


module.exports = upload