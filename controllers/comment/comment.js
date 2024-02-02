const Comment = require('../../models/comment/comment')
const asyncHandler = require("express-async-handler");
const { CustomError } = require("../../errors/customErrorApi");

// exports.Fetch_Comments = asyncHandler(async (req, res) => {

// })

// exports.Fetch_Comment = asyncHandler(async (req, res) => {

// })


exports.Create_Comment = asyncHandler(async (req, res) => {
    const { blogger, post_id,message } = req.body;

    // Use postId from the URL parameters to create a comment
    const newComment = await Comment.create({ blogger, post_id, message });

    res.status(200).json({ message: 'success', data: { newComment } });
});


exports.Update_Comment = asyncHandler(async (req, res) => {
    const id = req.params.id
    const comment = req.body

    const updatedComment = await Comment.findByIdAndUpdate(id, comment, { new: true })

    if(!updatedComment) throw CustomError('An Error Occured')

    res.status(200).json({message: 'success', data: {updatedComment}})
})


exports.Delete_Comment = asyncHandler(async (req, res) => {
    const id = req.params.id

    const deleteComment = await Comment.findByIdAndDelete(id)

    if(!deleteComment) throw CustomError('An Error Occured')

    res.status(200).json({message: 'success', data: {deleteComment}})
})