// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password, name }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username,
    password,
    name,
  }).then((response) => {
    localStorage.setItem('loggedNoteAppUser', JSON.stringify(response.body))
    cy.visit('')
  })
})

Cypress.Commands.add('newNote', ({ content, important }) => {
  console.log(
    'new note user',
    JSON.parse(localStorage.getItem('loggedNoteAppUser'))
  )
  cy.request({
    method: 'POST',
    url: `${Cypress.env('BACKEND')}/notes`,
    body: { content, important },
    headers: {
      authorization: `Bearer ${
        JSON.parse(localStorage.getItem('loggedNoteAppUser')).token
      }`,
    },
  })
  cy.visit('')
})
