import { describe, expect, test } from 'vitest'

import { checkWinner } from '~/utils/game'

const dimension = new Array<number>(3).fill(0)

describe('Game logic', () => {
    test('Can check winner - straight line column', () => {
        expect(checkWinner([
            { row: 0, col: 0, byPlayerIdx: 0 },
            { row: 1, col: 0, byPlayerIdx: 0 },
            { row: 2, col: 0, byPlayerIdx: 0 }
        ], dimension)).toBe(true)

        expect(checkWinner([
            { row: 0, col: 1, byPlayerIdx: 0 },
            { row: 1, col: 1, byPlayerIdx: 0 },
            { row: 2, col: 1, byPlayerIdx: 0 }
        ], dimension)).toBe(true)

        expect(checkWinner([
            { row: 0, col: 2, byPlayerIdx: 0 },
            { row: 1, col: 2, byPlayerIdx: 0 },
            { row: 2, col: 2, byPlayerIdx: 0 }
        ], dimension)).toBe(true)
    })

    test('Can check winner - straight line row', () => {
        expect(checkWinner([
            { row: 0, col: 0, byPlayerIdx: 0 },
            { row: 0, col: 1, byPlayerIdx: 0 },
            { row: 0, col: 2, byPlayerIdx: 0 }
        ], dimension)).toBe(true)

        expect(checkWinner([
            { row: 1, col: 0, byPlayerIdx: 0 },
            { row: 1, col: 1, byPlayerIdx: 0 },
            { row: 1, col: 2, byPlayerIdx: 0 }
        ], dimension)).toBe(true)

        expect(checkWinner([
            { row: 2, col: 0, byPlayerIdx: 0 },
            { row: 2, col: 1, byPlayerIdx: 0 },
            { row: 2, col: 2, byPlayerIdx: 0 }
        ], dimension)).toBe(true)
    })

    test('Can check winner - diagonal line', () => {
        expect(checkWinner([
            { row: 0, col: 0, byPlayerIdx: 0 },
            { row: 1, col: 1, byPlayerIdx: 0 },
            { row: 2, col: 2, byPlayerIdx: 0 }
        ], dimension)).toBe(true)

        expect(checkWinner([
            { row: 0, col: 2, byPlayerIdx: 0 },
            { row: 1, col: 1, byPlayerIdx: 0 },
            { row: 2, col: 0, byPlayerIdx: 0 }
        ], dimension)).toBe(true)
    })

    test('Can check winner -\nx _ _\nx _ _\n_ x _', () => {
        console.log('')
        expect(checkWinner([
            { row: 0, col: 0, byPlayerIdx: 0 },
            { row: 1, col: 0, byPlayerIdx: 0 },
            { row: 2, col: 1, byPlayerIdx: 0 }
        ], dimension)).toBe(false)
    })

    test('Can check winner -\nx _ _\n_ _ x\n_ x _', () => {
        console.log('')
        expect(checkWinner([
            { row: 0, col: 0, byPlayerIdx: 0 },
            { row: 1, col: 2, byPlayerIdx: 0 },
            { row: 2, col: 1, byPlayerIdx: 0 }
        ], dimension)).toBe(false)
    })
})
