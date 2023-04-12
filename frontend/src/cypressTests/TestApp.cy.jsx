import React from 'react'
import TestApp from './TestApp.jsx';

describe('<TestApp />', () => {
    
    beforeEach(() => {
        cy.mount(<TestApp />);

        cy.get('[data-cy="username"]').as('username');
        cy.get('[data-cy="password"]').as('password');
        cy.get('[data-cy="submit"]').as('submit');
        cy.get('[data-cy="message"]').as('message');

        cy.intercept('/login', (req) => {
            if (req.body.userId === 'username' && req.body.password === 'password') {
                req.reply({ success: true })
            }
            else {
                req.reply({ success: false })
            }
          }).as('login')
    })

    it('login success', () => {
        cy.get('@username').type('username');
        cy.get('@password').type('password');
        cy.get('@submit').click()
        cy.wait('@login')
        cy.get('@message').should('have.text', 'Success')
        cy.wait(2000)
        cy.wait(2000)
    })
    
    it('login failure', () => {
        cy.get('@username').type('bad username');
        cy.get('@password').type('bad password');
        cy.get('@submit').click()
        cy.wait('@login')
        cy.get('@message').should('have.text', 'Failure')
        cy.wait(2000)
    })

})