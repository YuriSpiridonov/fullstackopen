const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({
    username: 'root',
    passwordHash
  })

  await user.save()
})

describe('Testing adding users:', () => {
  test('creating a new user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'admin',
      name: 'Yuri',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  }, 10000)
})

afterAll(() => {
  mongoose.connection.close()
})
