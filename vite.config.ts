import path from 'path'

import { defineConfig } from 'vitest/config'

import react from '@vitejs/plugin-react'

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            reporter: ['json'],
            reportsDirectory: './vitest/coverage'
        }
    },
    plugins: [react()],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './src')
        }
    }
})
