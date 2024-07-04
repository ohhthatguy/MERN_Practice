const mongoose = require('mongoose')

const inputSchema =  mongoose.Schema({
    name1: {
        type: String,
        required: true
    },

    name2: {
        type: String,
        required: true
    },

    image: {

        type: String
    }
})

const InputModel = mongoose.model('Files', inputSchema)
module.exports = InputModel