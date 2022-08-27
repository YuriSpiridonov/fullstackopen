describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Gustav Nachtigal',
      username: 'gustav',
      password: '123qwe'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    const anotherUser = {
      name: 'Odd Hassel',
      username: 'hassel',
      password: 'qwe123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('Login')
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('#login-button').should('be.visible')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('gustav')
      cy.get('#password').type('123qwe')
      cy.get('#login-button').click()

      cy.contains('Gustav Nachtigal logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('not a gustav')
      cy.get('#password').type('not a password')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'gustav',
        password: '123qwe'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
      })
      cy.visit('http://localhost:3000')
    })

    it('a blog can be created', function() {
      cy.get('#create-new-blog').click()
      cy.get('#title').type('Blog created with E2E testing lib Cypress')
      cy.get('#author').type('Bo')
      cy.get('#url').type('blogurl.com')
      cy.get('#create').click()

      cy.contains('Blog created with E2E testing lib Cypress Bo')
    })

    it('blog can be liked', function() {
      cy.createBlog({
        title: 'Blog created to gather some likes',
        author: 'Bo',
        url: 'blog-likes-url.com'
      })

      cy.get('#view')
        .click()
      cy.contains('likes 0')
      cy.get('#like')
        .click()
      cy.contains('likes 1')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'gustav', password: '123qwe' })
      cy.createBlog({
        title: 'Blog created by Gustav and cant be deleted by Odd',
        author: 'Gustav',
        url: 'gustav.com'
      })

      cy.login({ username: 'hassel', password: 'qwe123' })
      cy.createBlog({
        title: 'Blog created by Odd and will be deleted by Odd',
        author: 'Odd',
        url: 'hassel.com'
      })
    })

    it('delete blog', function() {
      cy.contains('Blog created by Gustav and cant be deleted by Odd')
        .find('button')
        .should('contain', 'view')
        .click()
      cy.contains('Blog created by Gustav and cant be deleted by Odd')
        .parent()
        .parent()
        .find('button')
        .should('not.contain', 'delete')

      cy.contains('Blog created by Odd and will be deleted by Odd')
        .find('button')
        .should('contain', 'view')
        .click()
      cy.contains('Blog created by Odd and will be deleted by Odd')
        .parent()
        .parent()
        .find('button')
        .should('contain', 'delete')
      cy.get('#delete').click()

      cy.contains('Blog created by Odd and will be deleted by Odd').should('not.exist')
    })
  })

  describe('Blogs sorted by number of likes', function() {
    beforeEach(function() {
      cy.login({ username: 'gustav', password: '123qwe' })
      cy.createBlog({
        title: 'Post with 1 like',
        author: 'Gustav',
        url: 'gustav.com'
      })
      cy.createBlog({
        title: 'Post with 3 likes',
        author: 'Odd',
        url: 'odd.com'
      })
      cy.createBlog({
        title: 'Post with 2 likes',
        author: 'Hassel',
        url: 'hassel.com'
      })

      cy.contains('Post with 1 like')
        .find('button')
        .should('contain', 'view')
        .click()
      cy.contains('Post with 1 like')
        .parent()
        .find('button')
        .should('contain', 'like')
        .as('1like')

      cy.contains('Post with 2 likes')
        .find('button')
        .should('contain', 'view')
        .click()
      cy.contains('Post with 2 likes')
        .parent()
        .find('button')
        .should('contain', 'like')
        .as('2likes')

      cy.contains('Post with 3 likes')
        .find('button')
        .should('contain', 'view')
        .click()
      cy.contains('Post with 3 likes')
        .parent()
        .find('button')
        .should('contain', 'like')
        .as('3likes')
    })

    it('check if blogs are sorted', function() {
      cy.get('@1like').contains('like').as('like1')
      cy.get('@2likes').contains('like').as('like2')
      cy.get('@3likes').contains('like').as('like3')

      cy.get('@like1').click()
      cy.wait(100)
      cy.get('@like2').click()
      cy.wait(100)
      cy.get('@like2').click()
      cy.wait(100)
      cy.get('@like3').click()
      cy.wait(100)
      cy.get('@like3').click()
      cy.wait(100)
      cy.get('@like3').click()
      cy.wait(100)

      cy.get('div').then(blogs => {
        expect(blogs[0]).to.contain.text('Post with 3 likes')
        expect(blogs[1]).to.contain.text('Post with 2 likes')
        expect(blogs[2]).to.contain.text('Post with 1 like')
      })
    })
  })


})
