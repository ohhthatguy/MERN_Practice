const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fName: String,
    lName: String,
    email: String,
    occupation: String,
    city: String,
    bio: String

})

const userModel = mongoose.model('credential', userSchema)
module.exports = userModel