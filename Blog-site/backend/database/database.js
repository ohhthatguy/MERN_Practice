const mongoose = require('mongoose')

 const connection = async(DB_PASSWORD) =>{
    console.log(DB_PASSWORD)
    const URL = `mongodb+srv://bhaskar:${DB_PASSWORD}@cluster0.kqwseqo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

    try{
      await mongoose.connect(URL)
      console.log("db is connected")
    }catch(err){
        console.log("db cannot be connected", err)
    }
}

module.exports = connection;
