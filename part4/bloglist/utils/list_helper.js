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

const mostBlogs = (blogs) => {
  const authors = {}
  const popularAuthor = {
    author: '',
    blogs: 0
  }

  blogs.forEach((blog) => {
    authors[blog.author] = authors[blog.author] ? authors[blog.author] + 1 : 1
  })

  for (const [key, value] of Object.entries(authors)) {
    if (value > popularAuthor.blogs) {
      popularAuthor.author = key
      popularAuthor.blogs = value
    }
  }

  return popularAuthor

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
