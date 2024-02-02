const express = require('express')
const router = express.Router()
const {Create_Comment, Update_Comment, Delete_Comment} = require('../../controllers/comment/comment')

router.route('/').post(Create_Comment)

router.route('/:id').patch(Update_Comment).delete(Delete_Comment)


module.exports = router