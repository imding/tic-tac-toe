describe('tic-tac-toe game', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('passes', () => {
        cy.get('h1.text-white').should('have.length', 1)
    })
})
