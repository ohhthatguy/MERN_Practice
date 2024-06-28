const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    userName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    }

})

const Post = mongoose.model('post', postSchema)

module.exports = Post