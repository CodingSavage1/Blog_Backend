const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    blogger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blogger',
        required: true
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, {timestamps: true})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment