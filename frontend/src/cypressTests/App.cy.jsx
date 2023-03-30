import React from 'react'
import App from '../App'

describe('<App />', () => {
    it('renders', () => {
        cy.mount(<App />)
    })

    it('test text', () => {
        cy.mount(<App/>)
        cy.get('h1').should('have.text', 'Hello World!')
    })

    it('test input', () => {
        const INPUT_TEXT = "This is a test";
        cy.mount(<App />)
        const input = cy.get('[data-cy="input"]')
        input.should('have.text', '')
        
        input.type(INPUT_TEXT)
        input.should('have.value', INPUT_TEXT)
    })
    
    it('test counter', () => {
        cy.mount(<App />)

        cy.get('[data-cy="counter"]').as('counter')
        cy.get('[data-cy="button"]').as('button')
        cy.get('@counter').should('have.text', '0')

        const numClicks = 20;
        for (let i = 0; i < numClicks; i++) {
            cy.get('@button').click()
        }
        cy.get('@counter').should('have.text', numClicks)
    })
})