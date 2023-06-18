import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Cell } from '~/components/Cell'

describe('Cell component', () => {
    test('Can render <Cell />', () => {
        render(<Cell row={0} col={0} onMakeMove={() => ({ name: 'Ada', symbol: '🎃', index: 0 })} />)
        expect(screen).toBeTruthy()
    })
})
