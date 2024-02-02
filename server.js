const express = require('express')
const app = express()
require('dotenv').config()
const bosyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const post_route = require('./router/post/post')
const blogger_route = require('./router/bloggers/bloggers')
const comment_route = require('./router/comment/comment')

// Error HANDLER
const errorHandler = require("./middleware/errorHandler");

const mongodb_url = process.env.MONGOOSE_URL

// Middleware
app.use(bosyParser.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(req.method, req.params);
    next();
  });

app.use('/post', post_route)
app.use('/bloggers', blogger_route)
app.use('/comments', comment_route)

app.use(errorHandler)

mongoose.connect(mongodb_url).then(() => {
    app.listen(3000, console.log(`connected on port ${process.env.PORT}'`))
    console.log('database connected');
}).catch((err) => {
    console.log(err.message);
})
