const { getMaxListeners } = require('../models/blog')
const blog = require('../models/blog')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((totalLikes, savedBlog) => totalLikes + savedBlog.likes, 0)

const favoriteBlog  = (blogs) => {
  const favorite = blogs.reduce((favorite, savedBlog) => favorite = favorite.likes > savedBlog.likes ? favorite : savedBlog, 0)

  return {
    'title': favorite.title,
    'author': favorite.author,
    'likes': favorite.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
