describe('service is available', () => {
  it('should be available on localhost:3000', () => {
    cy.visit('http://localhost:3000')
  })
})

describe('routing testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('start page open', () => {
    cy.contains('МБОУ АЛГОСОШ')
  })

  it('string page open', () => {
    cy.get('a[href*="/recursion"]').click()
    cy.contains('Строка')
  })

  it('Fibonacci page open', () => {
    cy.get('a[href*="/fibonacci"]').click()
    cy.contains('Последовательность Фибоначчи')
  })

  it('Array sorting page open', () => {
    cy.get('a[href*="/sorting"]').click()
    cy.contains('Сортировка массива')
  })

  it('Stack page open', () => {
    cy.get('a[href*="/stack"]').click()
    cy.contains('Стек')
  })

  it('Queue page open', () => {
    cy.get('a[href*="/queue"]').click()
    cy.contains('Очередь')
  })

  it('List page open', () => {
    cy.get('a[href*="/list"]').click()
    cy.contains('Связный список')
  })
})
