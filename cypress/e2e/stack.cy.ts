describe('stack page tests', () => {
  it('check blocked button with empty input', () => {
    cy.visit('http://localhost:3000/stack')
    cy.get('form input').should('have.value', '')
    cy.get('form button').should('be.disabled')
  })

  it('check animations', () => {
    cy.get('form input').type('1234')
    cy.get('form button').contains('Добавить').click()

    cy.get('[class*=circle_content]').first().find('[class*=circle_changing]')
    cy.wait(500)
    cy.get('[class*=circle_content]').first().find('[class*=circle_default]')
  })

  it('check removed value from input', () => {
    cy.get('form input').should('have.value', '')
    cy.get('form button').should('be.disabled')
  })

  it('check remove work properly', () => {
    cy.get('form input').type('123')
    cy.get('form button').contains('Добавить').click()

    cy.get('[class*=circle_content]').last().find('[class*=circle_changing]')
    cy.wait(500)
    cy.get('[class*=circle_content]').last().find('[class*=circle_default]')

    cy.get('form button').contains('Удалить').click()

    cy.get('[class*=circle_content]').last().find('[class*=circle_changing]')
    cy.wait(500)
    cy.get('[class*=circle_content]').last().find('[class*=circle_default]')
  })

  it('check clear button work properly', () => {
    cy.get('form button').contains('Очистить').click()
    cy.get('[class*=circle_content]').should('not.exist')
  })
})
