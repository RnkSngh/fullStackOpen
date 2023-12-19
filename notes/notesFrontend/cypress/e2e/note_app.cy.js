const testUser = {
  name: 'Matti Luukkainen',
  username: 'mluukkai',
  password: 'salainen',
}
describe('Note App', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, testUser)
    cy.visit('')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2021'
    )
  })

  it('login can be opened', function () {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.contains('Matti Luukkainen logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: testUser.username, password: testUser.password })
    })

    it('a new note can be created', function () {
      cy.contains('add note').click()
      cy.get('#note-input').type('new note by cypress')
      cy.contains('save').click()
      cy.contains('new note by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.newNote({ content: 'another note by cypress', important: true })
      })

      it('it can be made not important', function () {
        cy.contains('another note by cypress')
          .contains('Make Unimportant')
          .click()

        cy.contains('another note by cypress').contains('Make Important')
      })
    })

    describe.only('and several notes exist', function () {
      beforeEach(function () {
        cy.newNote({ content: 'first note', important: false })
        cy.newNote({ content: 'second note', important: false })
        cy.newNote({ content: 'third note', important: false })
      })
      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'Make Unimportant')
      })
    })
  })

  it('login fails with wrong password', function () {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })
})
