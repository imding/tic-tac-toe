import { describe, expect, test } from 'vitest'

import { add } from '~/utils/add'

describe('Utils', () => {
    test('Can add 2 numbers', () => {
        expect(add(2, 4)).toBe(6)
    })
})
