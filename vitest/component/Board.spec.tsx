import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Board } from '~/components/Board'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TEST_ID } from '~/constants/testIds'

const p1 = { name: 'Ada', symbol: '🎃', index: 0 }
const p2 = { name: 'Leon', symbol: '👽', index: 1 }

describe('Board component', () => {
    test('Can render <Board />', async () => {
        const dimension  = new Array<number>(4).fill(0)
        let playAgain = () => null

        render(
            <QueryClientProvider client={new QueryClient()}>
                <Board dimension={dimension} game={{ moves: [], players: [p1, p2]}} onPlayAgain={playAgain} />
            </QueryClientProvider>
        )

        const boardContainer = await screen.findByTestId(TEST_ID.BOARD_CONTAINER)
        const cellContainer = await screen.findByTestId(TEST_ID.CELL_CONTAINER)

        expect(boardContainer).toBeTruthy()
        expect(boardContainer.children.length).toBe(3)

        expect(cellContainer).toBeTruthy()
        expect(cellContainer.children.length).toBe(Math.pow(dimension.length, 2))
    })
})
