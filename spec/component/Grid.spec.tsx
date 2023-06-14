import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Grid } from '~/components/Grid'

describe('Grid component', () => {
    test('Can render <Grid />', () => {
        render(<Grid width={2} height={3} />)
        expect(screen).toBeTruthy()
    })
})
