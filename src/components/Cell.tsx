import type { Player } from '~/types/Player'
import type { ComponentProps, FC } from 'react'

import { useState } from 'react'

export type CellProps = {
    row: number
    col: number
    getActivePlayer: () => Player
    toggleActivePlayer: () => void
}

export const Cell: FC<CellProps> = ({ row, col, getActivePlayer, toggleActivePlayer }) => {
    console.log('rendered cell', row, col)
    const [activePlayer, setActivePlayer] = useState<Player>()
    const containerProps: ComponentProps<'div'> = {
        className: `w-12 h-12 border cursor-pointer ${activePlayer ? 'pointer-events-none' : ''}`,
        onClick: () => {
            setActivePlayer(getActivePlayer())
            toggleActivePlayer()
        }
    }

    return (
        <div {...containerProps}>
            {activePlayer?.symbol}
        </div>
    )
}
