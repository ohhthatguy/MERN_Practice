const InputModel = require('../model/inputModel')
const Grid = require('gridfs-stream')
const mongoose = require('mongoose')

const savePost = async(req,res)=>{
   
    try{
        const data = new InputModel(req.body)
        await data.save()
        return res.status(200).json({msg: `post saved`})
    }catch(err){
        return res.status(500).json({msg: `post didnt saved, ${err}`})

    }
    

}

const saveImage = (req,res)=>{
    // console.log(req.files)
    if(!req.files){
        return res.status(404).json({msg: "no file(s) were found to send to server"})
    }

    let endPoints = [];
    
    req.files.map((e)=>{
        // endPoints = [...endPoints,e.filename]
        endPoints = [...endPoints,`http://localhost:6969/file/${e.filename}`]   
    })

    // console.log(endPoints)
      
   
        return res.status(200).json(endPoints)


   
}

let gfs,gridfsbucket;
const conn = mongoose.connection;

conn.once('open', ()=>{
    gridfsbucket = new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName: 'photos'
    })

    gfs = Grid(conn.db,mongoose.mongo)
    gfs.collection('photos')
})

const getUploadedImage = async(req,res)=>{
    console.log("im inside getupload Image")
    

  
    const filename = req.params.filename
    // console.log(filename)

    try{
        const file = await gfs.files.findOne({filename: filename})
        const readStream = gridfsbucket.openDownloadStream(file._id);
        readStream.pipe(res);
      
    }catch(err){
        return res.status(500).json({msg: `photo's been uploaded but fetching  is showing error.`, err})
    }

}

module.exports = {savePost, saveImage, getUploadedImage}