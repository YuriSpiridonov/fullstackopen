const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')


const express = require('express')
const app = express()
const cors = require('cors')

const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

// const server = http.createServer()

const Blog = mongoose.model('Blog', blogSchema)

// const mongoUrl = 'mongodb+srv://LOGIN:PASSWORD@cluster0.xwerp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

// const PORT = 3003
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`)
})