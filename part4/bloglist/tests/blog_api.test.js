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

describe('Check ID definition:', () => {
  test('Is ID field defined as `id` insted of `_id`', async () => {
    const response = await api
      .get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('Testing GET reqest(s):', () => {
  test('Blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('All blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('Check if a blog posts without likes (zero likes) are exist', async () => {
    const blogs = await helper.blogsInDb()
    const likes = blogs.map(r => r.likes)
    expect(likes).toContain(0)
  })
})

describe('Testing POST request(s):', () => {
  test('Adding new entrie to DB', async () => {
    const newBlog = {
      title: 'Test blog entry',
      author: 'Yuri',
      url: 'localhost',
      likes: 350,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).toContain('Test blog entry')
  }, 100000)

  test('Adding new entrie WITOUT LIKES to DB', async () => {
    const newBlog = {
      title: 'Test blog entry2',
      author: 'Yuri',
      url: 'localhost',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(r => r.likes)

    expect(
      contents.reduce(
        (c, n) => (n === 0 ? c + 1: c), 0
      )
    ).toBe(2)

  }, 100000)

  test('POST request without title and url', async () => {
    const newBlog = {
      author: 'Yuri',
      likes: 350,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('Testing DELETE request(s):',  () => {
  test('Deleting saved blog from DB', async () => {
    const currentBlogsInDb = await helper.blogsInDb()
    const blogToDelete = currentBlogsInDb[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAfterDelete = await helper.blogsInDb()

    expect(blogsAfterDelete).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const contents = blogsAfterDelete.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('Testing PUT request(s):', () => {
  test('Updating likes in post', async () => {
    const currentBlogsInDb = await helper.blogsInDb()
    const blogToUpdate = currentBlogsInDb[0]
    blogToUpdate.likes = 666

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAfterUpdate = await helper.blogsInDb()
    const contents = blogsAfterUpdate.map(r => r.likes)

    expect(contents).toContain(666)
  }, 100000)
})

afterAll(() => {
  mongoose.connection.close()
})