const blog = require('../models/blog')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((totalLikes, savedBlog) => totalLikes + savedBlog.likes, 0)

module.exports = {
  dummy,
  totalLikes
}
