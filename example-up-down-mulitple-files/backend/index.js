
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require("body-parser")

const router = require('./routes/routes')


const dotenv = require('dotenv').config()
const checkConnect = require('./database/connection')

app.use(cors())
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', router)

const port = process.env.port
app.listen(port, ()=>{
    console.log(`DB is running at port ${port}`)
})

checkConnect(process.env.DB_NAME)

