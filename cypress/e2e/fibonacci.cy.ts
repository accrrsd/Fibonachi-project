describe('fibonacci page tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/fibonacci')
  })

  it('check blocked button with empty input', () => {
    cy.get('form input').clear()
    cy.get('form button').should('be.disabled')
    cy.get('form input').type('123')
    cy.get('form button').should('be.disabled')
  })

  it('check fibonacci work properly', () => {
    cy.get('form input').clear()
    cy.get('form input').type('6')
    cy.get('form button').click()
    cy.wait(500)
    cy.get('[class*=text_type_circle]').first().should('have.text', '1')
    cy.wait(4000)
    cy.get('[class*=text_type_circle]').last().should('have.text', '13')
  })
})
