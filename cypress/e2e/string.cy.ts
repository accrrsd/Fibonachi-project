// import { ElementStates } from '../../src/types/element-states'
describe('string page tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/recursion')
  })

  it('check blocked button with empty input', () => {
    cy.get('form input').should('have.value', '')
    cy.get('form button').should('be.disabled')
  })

  it('check animation works properly', () => {
    cy.get('form input').type('12').should('have.value', '12')
    cy.get('form button').click()

    cy.get('[class*=circle_content]').first().find('[class*=circle_default]')

    cy.wait(1000)

    cy.get('[class*=circle_content]').first().find('[class*=circle_changing]')

    cy.wait(1000)

    cy.get('[class*=circle_content]').first().find('[class*=circle_modified]')

    // Корректность переворота строки
    cy.get('[class*=text_type_circle]').first().should('have.text', '2')
  })
})
