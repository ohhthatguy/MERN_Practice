const express = require('express');
const connection = require('./database/database');
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const dotenv = require('dotenv').config();
const router = require('./routes/userLogIn')

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', router);



const PORT = 5000
app.listen(PORT, ()=>{
    console.log("Running at 5000")
})

const DB_PASSWORD = process.env.DB_PASSWORD;
connection(DB_PASSWORD);