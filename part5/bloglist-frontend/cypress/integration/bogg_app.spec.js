describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Gustav Nachtigal',
      username: 'gustav',
      password: '123qwe'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
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
      cy.get('#username').type('gustav')
      cy.get('#password').type('123qwe')
      cy.get('#login-button').click()
    })

    it('a blog can be created', function() {
      cy.get('#create-new-blog').click()
      cy.get('#title').type('Blog created with E2E testing lib Cypress')
      cy.get('#author').type('Bo')
      cy.get('#url').type('blogurl.com')
      cy.get('#create').click()

      cy.contains('Blog created with E2E testing lib Cypress Bo')
    })
  })
})
