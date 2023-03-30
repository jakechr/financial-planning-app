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
})