describe('tic-tac-toe game', () => {
    beforeEach(() => {
        cy.visit('https://imding.github.io/tic-tac-toe')
    })

    it('passes', () => {
        cy.get('h1.text-white').should('have.length', 1)
    })
})
