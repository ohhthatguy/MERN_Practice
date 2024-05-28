const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const userModel = require('./model/user.model')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://bhaskar:bhaskar1234@cluster0.kqwseqo.mongodb.net/FORM?retryWrites=true&w=majority&appName=Cluster0')

// POST
app.post('/postData', async(req,res)=>{

    const sendUser = new userModel(req.body)
    try{

        await sendUser.save()
        res.status(200).json({
            status: 'saved data to database',
            data: sendUser
        })

    }catch(err){
        res.status(500).json({
            status: 'failed',
            message: err
        })
    }

})

//GET ALL
app.get('/getData', async(req,res)=>{
    const getUser= await userModel.find({})
    try{
        res.status(200).json({
         status: 'fetched all data from database',
         data: getUser   
        })

    }catch(err){
        res.status(500).json({
            status: 'failed',
            message: err
        })
    }
})

//GET UNIQUE BY ID
app.get('/getData/:id', async(req, res)=>{
    const getUser = await userModel.findById(req.params.id)
    try{
        res.status(200).json({
         status: 'fetched all data from database',
         data: getUser   
        })

    }catch(err){
        res.status(500).json({
            status: 'failed',
            message: err
        })
    }

})

//UPDATE
app.patch('/updateData/:id', async(req,res)=>{

    const updateuser = await userModel.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
    })

    try{
        res.status(200).json({
            status: 'data updated',
            data: updateuser
        })

    }catch(err){
        res.status(500).json({
            status: 'failed',
            message: err
        })
    }
})

//DELETE
app.delete('/deleteUser/:id', async(req,res)=>{
    const deletedData = await userModel.findByIdAndDelete(req.params.id)
    
    try{
        res.status(200).json({
            status: 'data deleted',
            data: deletedData
        })

    }catch(err){
        res.status(500).json({
            status: 'failed',
            message: err
        })
    }

})

app.listen('3001', ()=>{
    console.log('server running on PORT: 3001')
})