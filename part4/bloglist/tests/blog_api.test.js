const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObject = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('Blogs API tests:', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
