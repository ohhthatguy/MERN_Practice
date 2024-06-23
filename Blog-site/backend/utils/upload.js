const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')
const dotenv = require('dotenv').config()


console.log(process.env.DB_PASSWORD)

const storage = new GridFsStorage({
    url:  `mongodb+srv://bhaskar:${process.env.DB_PASSWORD}@cluster0.kqwseqo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    // option: { useNewUrlParser: true },
    file: (req,file)=>{
        const match = ['image/png','image/jpg','image/jpeg']
        console.log(file)
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

const upload = multer({ storage });

module.exports = upload;