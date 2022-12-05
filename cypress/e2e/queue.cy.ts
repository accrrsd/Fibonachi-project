describe('queue page tests', () => {
  it('check blocked button with empty input', () => {
    cy.visit('http://localhost:3000/queue')
    cy.get('form input').should('have.value', '')
    cy.get('form button').should('be.disabled')
  })

  it('check animations works properly', () => {
    cy.get('[class*=circle_content]').first().find('[class*=circle_default]')
    cy.get('[class*=circle_content]').first().should('not.include.text', 'head')
    cy.get('[class*=circle_content]').first().should('not.include.text', 'tail')

    cy.get('form input').type('1234')
    cy.get('form button').contains('Добавить').click()

    cy.get('[class*=circle_content]').first().find('[class*=circle_changing]')
    cy.wait(500)
    cy.get('[class*=circle_content]').first().find('[class*=circle_default]')
    cy.get('[class*=circle_content]').first().should('include.text', 'head')
    cy.get('[class*=circle_content]').first().should('include.text', 'tail')
    cy.get('[class*=circle_content]').first().should('include.text', '1234')
  })

  it('check remove work properly', () => {
    cy.get('form button').contains('Удалить').click()
    cy.get('[class*=circle_content]').first().find('[class*=circle_changing]')
    cy.wait(500)
    cy.get('[class*=circle_content]').first().find('[class*=circle_default]')
  })

  it('check clear button work properly', () => {
    cy.get('form input').type('1234')
    cy.get('form button').contains('Добавить').click()

    cy.wait(500)

    cy.get('form input').type('1234')
    cy.get('form button').contains('Добавить').click()

    cy.wait(500)

    cy.get('form button').contains('Очистить').click()
    cy.wait(500)
    cy.get('[class*=circle_content]').contains('1234').should('not.exist')
  })
})
