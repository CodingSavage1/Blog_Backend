const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Separate Schemas for reusability
const PersonalDetailsSchema = new Schema({
    names: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const LoginSchema = new Schema({
    blog_username: {
        type: String,
        required: true
    },
    blog_password: {
        type: String,
        // Use bcrypt to hash and salt the password before saving
    }
});

const BlogSchema = new Schema({
    blog_name: {
        type: String,
        required: true
    },
    blog_category: {
        type: String,
        required: true
    },
    blog_description: {
        type: String,
        required: true
    },
    blog_image: {
        type: String,
        required: true
    },
    blog_posts: [
        {
            post_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post'
            }
        }
    ]
});

const BloggerSchema = new Schema({
    personal_details: [PersonalDetailsSchema],
    login: [LoginSchema],
    blog: [BlogSchema]
}, { timestamps: true });

const Blogger = mongoose.model('Blogger', BloggerSchema);

module.exports = Blogger;
