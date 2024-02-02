const express = require('express')
const router = express.Router()
const {Fetch_Blogs, Fetch_Blog, Create_Blog, Update_Blog
, Delete_Blogs} = require('../../controllers/bloggers/bloggers')

router.route('/').get(Fetch_Blogs).post(Create_Blog)

router.route('/:id').get(Fetch_Blog).patch(Update_Blog).delete(Delete_Blogs)

module.exports = router