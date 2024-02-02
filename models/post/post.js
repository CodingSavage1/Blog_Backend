const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    blogger: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Blogger'
    },
    category: {
        type: String,
        required: true
    },
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
        required: true
    },
    comment: [
        {
            comment_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }
        }
    ],
    reactions: [
        {
            reacted: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Blogger',
            },
            reaction: {
                type: String
            }
        }
    ],
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
