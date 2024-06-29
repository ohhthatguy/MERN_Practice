const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdDate: {
        type: String,
        required: true
    }
})

const Comment = mongoose.model('comments', commentSchema)
module.exports  = Comment