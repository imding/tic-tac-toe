import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        specPattern: ['cypress/e2e/game.cy.ts'],
        supportFile: false,
        setupNodeEvents() {
            // implement node event listeners here
        }
    }
})
