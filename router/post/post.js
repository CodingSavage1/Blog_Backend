const express = require('express')
const router = express.Router()
const {Fetch_Posts, Fetch_Post, Create_Post, Update_Posts, Delete_Posts} = require('../../controllers/post/post')

router.route('/').get(Fetch_Posts).post(Create_Post)

router.route('/:id').get(Fetch_Post).patch(Update_Posts).delete(Delete_Posts)

module.exports = router