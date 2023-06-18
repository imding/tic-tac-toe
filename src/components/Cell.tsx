import type { Game } from '~/types/Game'
import type { Player } from '~/types/Player'
import type { ComponentProps, FC } from 'react'

import { Q } from '~/constants/queryKeys'
import { get, set } from 'idb-keyval'
import { useEffect, useRef } from 'react'

export type CellProps = {
    row: number
    col: number
    initiallyOccupiedBy?: Player
    onMakeMove: (row: number, col: number) => Player
}

export const Cell: FC<CellProps> = ({ row, col, initiallyOccupiedBy, onMakeMove }) => {
    const symbolRef = useRef<HTMLParagraphElement>(null)
    const containerProps: ComponentProps<'div'> = {
        className: 'grid place-items-center w-12 h-12 border cursor-pointer',
        onClick: () => {
            const _activePlayer = onMakeMove(row, col)

            if (symbolRef.current) {
                symbolRef.current.innerText = _activePlayer.symbol
            }

            void get<Game>(Q.UNFINISHED_GAME).then(unfinishedGame => {
                if (!unfinishedGame) {
                    return console.warn('Failed to fetch unfinished game.')
                }

                unfinishedGame.moves.push({ row, col, byPlayerIdx: _activePlayer.index })
                void set(Q.UNFINISHED_GAME, unfinishedGame)
            })
        }
    }

    useEffect(() => {
        if (symbolRef.current && initiallyOccupiedBy?.symbol) {
            symbolRef.current.innerText = initiallyOccupiedBy.symbol
        }
    }, [initiallyOccupiedBy?.symbol])

    return (
        <div {...containerProps}>
            <p ref={symbolRef} />
        </div>
    )
}
