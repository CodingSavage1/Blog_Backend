const Blogger = require('../../models/bloggers/bloggers')
const asyncHandler = require("express-async-handler");
const { CustomError } = require("../../errors/customErrorApi");


// FETCH ALL THE BLOGS
exports.Fetch_Blogs = asyncHandler(async (req, res) => {
    const blogger = await Blogger.find();

    if(blogger.length <= 0) throw CustomError('No Blogger Found')

    res.status(200).json({message: 'success', data: {blogger}})
})

// FETCH BLOG WITH ID
exports.Fetch_Blog = asyncHandler(async  (req, res) => {
    const id = req.params.id

    const blogger = await Blogger.findById(id)

    if(!blogger) throw CustomError('Blogger Not Found')

    res.status(200).json({message: 'success', data: {blogger}})
})

// CREATE A NEW BLOG
exports.Create_Blog = asyncHandler(async (req, res) => {
    const newBlogger = req.body;

    const emailExist = await Blogger.findOne({ 'personal_details.email': newBlogger.personal_details[0].email });
    if (emailExist) {
        throw CustomError('Email Already Exists', 500);
    }

    const blogNameExist = await Blogger.findOne({ 'blog.blog_name': newBlogger.blog[0].blog_name });
    if (blogNameExist) {
        throw CustomError('Blog Name Already Exists', 500);
    }

    // Use await to ensure the creation is completed before proceeding
    const createdBlog = await Blogger.create(newBlogger);

    res.status(200).json({ message: 'success', data: { createdBlog } });
});

// LOGGIN BLOG
exports.Loggin = asyncHandler(async (req, res) => {
    const blogs = req.body;

    const username = await Blogger.findOne({'': blogs.login[0].blog_username})
    const password = await Blogger.findOne({'': blogs.login[0].blog_password})

    if(!username || password) throw CustomError('Incorrect Username OR Password')
})

// UPDATE BLOG DETAILS
exports.Update_Blog = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const updateBlog = req.body;

    const updatedBlog = await Blogger.findByIdAndUpdate(id, updateBlog, { new: true });

    if (!updatedBlog) {
        // Using return to prevent further execution
        return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'success', data: { updatedBlog } });
});



exports.Delete_Blogs = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const deletedBlog = await Blogger.findByIdAndDelete(id);

    if (!deletedBlog) throw new CustomError('Blogger Not Found', 404);

    res.status(200).json({ message: 'success', data: { deletedBlog } });
});
