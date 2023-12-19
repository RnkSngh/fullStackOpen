describe('blog app end to end', () => {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/tests/reset/`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      username: 'testUsername',
      name: 'test name',
      password: '123456',
    })
    cy.visit('')
  })

  it('login form is shown on homepage', () => {
    cy.contains('login')
  })

  describe('login', function () {
    it('allows user to login successfully', () => {
      cy.contains('login').click()
      cy.get('#login-username').type('testUsername')
      cy.get('#login-password').type('123456')
      cy.contains('submit').click()
      cy.contains('logged in successfully')
    })
    it('does not allow user to login with invalid credentials', () => {
      cy.contains('login').click()
      cy.get('#login-username').type('testUsername')
      cy.get('#login-password').type('wrongpassword')
      cy.contains('submit').click()
      cy.contains('Request failed with status code 400').should(
        'have.css',
        'color',
        'rgb(255, 0, 0)'
      )
    })
  })

  describe('when logged in ', function () {
    beforeEach(function () {
      cy.login({ username: 'testUsername', password: '123456' })
    })
    it('allows user to create a new blog', function () {
      cy.contains('add new blog').click()
      cy.get('#title-input').type('This is Title of New Blog')
      cy.get('#author-input').type('Author New blog')
      cy.get('#url-input').type('http://blogisHere.com')
      cy.contains('submit').click()
      cy.contains('New Blog added')
      cy.contains('This is Title of New Blog')
      cy.get('html').should('not.contain', 'Author New Blog')
    })

    describe('when users create a blog', function () {
      beforeEach(function () {
        cy.contains('add new blog').click()
        cy.get('#title-input').type('This is Title of New Blog')
        cy.get('#author-input').type('Author New blog')
        cy.get('#url-input').type('http://blogisHere.com')
        cy.contains('submit').click()
      })

      it('allows users to like a blog', function () {
        cy.contains('show').click()
        cy.contains('like').click()
        cy.contains('likes: 1')
      })

      it('allows users to delete their own blog', function () {
        cy.contains('This is Title of New Blog')
          .parent()
          .contains('show')
          .click()
        cy.contains('delete').click()
        cy.get('html').should('not.contain', 'Author New Blog')
      })

      it('only creator can delete their own blog', function () {
        localStorage.removeItem('blogApp.user')

        cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
          username: 'newUser2',
          name: 'test name 2',
          password: '7891011',
        })
        cy.login({ username: 'newUser2', password: '7891011' })
        cy.contains('This is Title of New Blog')
          .parent()
          .contains('show')
          .click()

        cy.contains('This is Title of New Blog')
          .parent()
          .should('not.contain', 'delete')
      })
    })

    describe('when users create multiple blogs', function () {
      beforeEach(function () {
        cy.addBlog({
          title: 'blog title 1',
          author: 'authorblogone',
          url: 'http://blog1',
        })
        cy.addBlog({
          title: 'blog title 2',
          author: 'authorblogtwo',
          url: 'http://blog2',
        })
        cy.addBlog({
          title: 'blog title 3',
          author: 'authorblogthree',
          url: 'http://blog3',
        })
        cy.visit('')
      })
      it('they are sorted by likes', function () {
        cy.visit('')
        cy.get('.blog').contains('blog title 3').parent().as('blog3')
        cy.get('.blog').contains('blog title 2').parent().as('blog2')
        cy.get('.blog').contains('blog title 1').parent().as('blog1')

        cy.get('@blog3').contains('show').click()
        cy.get('@blog3').contains('like').click()
        cy.get('@blog3').contains('likes: 1')
        cy.get('@blog3').contains('like').click()
        cy.get('@blog3').contains('likes: 2')
        cy.get('@blog3').contains('like').click()
        cy.get('@blog3').contains('likes: 3')
        cy.get('@blog3').contains('like').click()
        cy.get('@blog3').contains('likes: 4')
        cy.get('@blog3').contains('like').click()

        cy.get('@blog2').contains('show').click()
        cy.get('@blog2').contains('like').click()
        cy.get('@blog2').contains('likes: 1')
        cy.get('@blog2').contains('like').click()
        cy.get('@blog2').contains('likes: 2')
        cy.get('@blog2').contains('like').click()

        cy.visit('')
        cy.get('.blog').eq(0).should('contain', 'blog title 3')
        cy.get('.blog').eq(1).should('contain', 'blog title 2')
        cy.get('.blog').eq(2).should('contain', 'blog title 1')
      })
    })
  })
})
