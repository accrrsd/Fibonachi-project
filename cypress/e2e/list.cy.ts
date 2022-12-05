describe('list page tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/list')
  })

  it('check blocked buttons with empty input', () => {
    cy.get('form input').first().should('have.value', '')
    cy.contains('form button', 'Добавить в head').should('be.disabled')
    cy.contains('form button', 'Добавить в tail').should('be.disabled')
    cy.contains('form button', 'Добавить по индексу').should('be.disabled')
    cy.contains('form button', 'Удалить по индексу').should('be.disabled')
  })

  it('default list work properly', () => {
    cy.get('[class*=list-page_display]').children().should('have.length', 4)
    cy.get('[class*=list-page_display]')
      .children()
      .each((circle, i) => {
        const checkI = () => {
          switch (i) {
            case 0:
              return 0
            case 1:
              return 34
            case 2:
              return 8
            case 3:
              return 1
            default:
              break
          }
        }

        cy.wrap(circle).should('contain.text', checkI())
      })
  })

  it('check add element to head', () => {
    cy.get('form input').first().type('1234')
    cy.contains('form button', 'Добавить в head').click()
    cy.wait(1000)
    cy.get('[class*=list-page_display]').children().first().should('contain.text', 'head')
    cy.get('[class*=list-page_display]').children().first().should('contain.text', '1234')
  })

  it('check add element to tail', () => {
    cy.get('form input').first().type('1234')
    cy.contains('form button', 'Добавить в tail').click()
    cy.wait(1000)
    cy.get('[class*=list-page_display]').children().last().should('contain.text', 'tail')
    cy.get('[class*=list-page_display]').children().last().should('contain.text', '1234')
  })

  it('check add element by index', () => {
    cy.get('form input').first().type('1234')
    cy.get('form input').last().type('1')
    cy.contains('form button', 'Добавить по индексу').click()
    cy.wait(2500)
    cy.get('[class*=list-page_display]').children().eq(1).should('contain.text', '1234')
  })
  // // ----
  it('check remove element from head', () => {
    cy.contains('form button', 'Удалить из head').click()
    cy.wait(1000)
    cy.get('[class*=list-page_display]').children().first().should('contain.text', 'head')
    cy.get('[class*=list-page_display]').children().first().should('contain.text', '34')
  })

  it('check remove element from tail', () => {
    cy.contains('form button', 'Удалить из tail').click()
    cy.wait(1000)
    cy.get('[class*=list-page_display]').children().last().should('contain.text', 'tail')
    cy.get('[class*=list-page_display]').children().last().should('contain.text', '8')
  })

  it('check remove element by index', () => {
    cy.get('form input').last().type('1')
    cy.contains('form button', 'Удалить по индексу').click()
    cy.wait(3000)
    cy.get('[class*=list-page_display]').children().eq(1).should('contain.text', '8')
  })
})
