const mongoose = require('mongoose')

const connection = async(db_name) =>{

    const URL = db_name;
    try{
        await mongoose.connect(URL)
        console.log("DB connected succesfully")
    }catch(err){
        console.log(`DB did not connect succesfully, error: ${err}`)
    }

}

module.exports = connection;