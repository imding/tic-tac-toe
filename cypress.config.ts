import codeCoverageTask from '@cypress/code-coverage/task'
import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000/tic-tac-toe',
        specPattern: ['cypress/e2e/game.cy.ts'],
        setupNodeEvents(on, config) {
            codeCoverageTask(on, config)
            return config
        }
    }
})
