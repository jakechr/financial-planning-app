import Goals from "app/views/dashboard/Goals"

const initialNumRows = 2;

const initModalElements = () => {
    cy.get('[data-cy="add-goal-submit"]').as('submit');
    cy.get('[data-cy="add-goal-cancel"]').as('cancel');

    cy.get('[data-cy="goal-field-name"]').as('name');
    cy.get('[data-cy="goal-field-description"]').as('description');
    cy.get('[data-cy="goal-field-date"]').as('date');
    cy.get('[data-cy="goal-field-amount"]').as('amount');
}

describe('Goal Table', () => {

    beforeEach(() => {
        cy.mount(<Goals />)

        cy.get('[data-cy="add-row-button"]').as('add');
    })

    it('Open and close modal', () => {
        cy.get('@add').should('have.text', 'Add New Goal')
        cy.get('@add').click()
        initModalElements();
        cy.get('@submit').should('exist')
        cy.get('@cancel').click()
        cy.get('@submit').should('not.exist')
    })

    // duplicated from Goals.jsx - bad practice
    const mockGoals = [
        {
          name: "Subaru",
          date: "10/1/2024",
          amount: 10000,
          description: "get a used car"
        },
        {
          name: "Better Subaru",
          date: "12/1/2025",
          amount: 25000,
          description: "get a nicer car"
        },
    ];
    
    it('Verify Dummy Data', () => {
        cy.get('[data-cy="goal-row"').should('have.length', initialNumRows)
        cy.get('[data-cy="goal-row"').each((item, index) => {
            const data = mockGoals[index];
            const expectedValue = `${data.name}${data.description}${data.date}$${data.amount}`
            expect(Cypress.$(item).text()).to.eq(expectedValue)
        })
    })

    const newGoal = {
        name: "House",
        date: "2030-04-17",
        amount: 100000,
        description: "Save enough money to buy a house"
    }

    it('Insert Data and Verify it is in the table', () => {
        cy.get('[data-cy="goal-row"').should('have.length', initialNumRows)
        cy.get('@add').click()
        initModalElements();

        cy.get('@name').type(newGoal.name)
        cy.get('@description').type(newGoal.description)
        cy.get('@date').type(newGoal.date)
        cy.get('@amount').type(newGoal.amount)
        
        cy.get('@submit').click()

        const expectedValue = `${newGoal.name}${newGoal.description}${newGoal.date}$${newGoal.amount}`;
        cy.get('[data-cy="goal-row"').eq(initialNumRows).should('have.text', expectedValue);
    })
  })