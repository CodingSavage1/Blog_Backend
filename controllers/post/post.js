const Post = require('../../models/post/post')
const asyncHandler = require("express-async-handler");
const { CustomError } = require("../../errors/customErrorApi");
const Blogger = require('../../models/bloggers/bloggers');

exports.Fetch_Posts = asyncHandler(async (req, res) => {
    try {
        const allPostsWithBloggerDetails = await Post.find()
            .populate({
                path: 'blogger',
                model: 'Blogger',
                select: 'blog'
            })
            .select('-__v'); // Exclude unnecessary fields

        if (!allPostsWithBloggerDetails || allPostsWithBloggerDetails.length === 0) {
            throw new CustomError(404, 'No posts found');
        }

        res.json({ data: { posts: allPostsWithBloggerDetails } });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
});


exports.Fetch_Post = asyncHandler(async (req, res) => {
    try {
        const postId = req.params.id;

        const postWithBloggerDetails = await Post.findById(postId)
            .populate({
                path: 'blogger',
                model: 'Blogger',
                select: 'blog'
            })
            .select('-__v'); // Exclude unnecessary fields

        if (!postWithBloggerDetails) {
            throw CustomError('Post not found', 404);
        }

        res.status(200).json({ message: '', data: { post: postWithBloggerDetails } });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
});


exports.Create_Post = asyncHandler(async (req, res) => {
    const newPost = req.body;

    // Create the new post
    const savedPost = await Post.create(newPost);

    // Assuming you have the blogger's email in req.body.email
    const bloggerId = req.body.blogger;

    // Find the blogger by email
    const blogger = await Blogger.findOne({ _id: bloggerId });

    if (!blogger) {
        return res.status(404).json({ message: 'Blogger not found' });
    }

    // Assuming there's only one blog for each blogger
    blogger.blog[0].blog_posts.push({ post_id: savedPost._id });

    // Save the changes
    await blogger.save();

    res.status(200).json({ message: 'success', data: { savedPost } });
});




exports.Update_Posts = asyncHandler(async  (req, res) => {
    const id = req.params.id
    const updatePost = req.body

    const updatedPost = await Post.findByIdAndUpdate(id, updatePost, {new: true})

    if(!updatedPost) throw CustomError('An Error Occured')

    res.status(200).json({message: 'success', data: {updatedPost}})
})

exports.Delete_Posts = asyncHandler(async (req, res) => {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
        throw CustomError('Post not found', 404);
    }

    res.json(deletedPost);
})