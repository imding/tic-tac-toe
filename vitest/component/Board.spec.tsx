import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Board } from '~/components/Board'

describe('Grid component', () => {
    test('Can render <Grid />', () => {
        render(<Board />)
        expect(screen).toBeTruthy()
    })
})
