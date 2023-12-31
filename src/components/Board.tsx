import type { CellProps } from './Cell'
import type { FC } from 'react'
import type { Player } from '~/types/Player'
import type { Game, Move } from '~/types/Game'

import { useQueryClient } from '@tanstack/react-query'
import { del, get, set } from 'idb-keyval'
import { useEffect, useRef } from 'react'

import { Cell } from '~/components/Cell'
import { Q } from '~/constants/queryKeys'
import { TEST_ID } from '~/constants/testIds'
import { checkWinner, getActivePlayer } from '~/utils/game'

type BoardProps = {
    dimension:Array<number>
    game: Game
    onPlayAgain: () => void
}

export const Board: FC<BoardProps> = ({ dimension, game, onPlayAgain }) => {
    const moves = useRef<Array<Move>>(game.moves)
    const players = useRef<[Player, Player]>(game.players)
    const announcerRef = useRef<HTMLHeadingElement>(null)
    const playAgainRef = useRef<HTMLButtonElement>(null)
    const boardRef = useRef<HTMLDivElement>(null)
    const queryClient = useQueryClient()
    const updateAnnouncer = (text: string) => {
        if (announcerRef.current) {
            announcerRef.current.innerText = text
        }
    }
    const cells = dimension.map((_, row) => dimension.map((_, col) => {
        const pastMove = moves.current.find(move => move.row === row && move.col === col)
        const cellProps: CellProps = {
            row,
            col,
            initiallyOccupiedBy: pastMove && players.current[pastMove.byPlayerIdx],
            onMakeMove: (row, col) => {
                const activePlayer = getActivePlayer(moves.current, players.current)
                const move = { row, col, byPlayerIdx: activePlayer.index }

                moves.current.push(move)
                updateAnnouncer(`${getActivePlayer(moves.current, players.current).name}'s Turn`)

                const playerMoves = moves.current.filter(({ byPlayerIdx }) => byPlayerIdx === move.byPlayerIdx)
                const player = players.current[move.byPlayerIdx]

                if (checkWinner(playerMoves, dimension)) {
                    if (playAgainRef.current) {
                        playAgainRef.current.hidden = false
                    }

                    if (boardRef.current) {
                        boardRef.current.style.pointerEvents = 'none'
                    }

                    player && updateAnnouncer(`${player.name} won!`)

                    queryClient.removeQueries([Q.UNFINISHED_GAME])

                    void del(Q.UNFINISHED_GAME)
                    void get<Array<Game>>(Q.FINISHED_GAMES).then(finishedGames => {
                        void set(Q.FINISHED_GAMES, finishedGames ? [...finishedGames, { moves, players }] : [{ moves, players }])
                    })
                }

                return activePlayer
            }
        }

        return <Cell {...cellProps} key={`${row}-${col}`} />
    })).flat()

    useEffect(() => {
        updateAnnouncer(`${getActivePlayer(moves.current, players.current).name}'s Turn`)
    }, [])

    return (
        <div className='h-full grid place-items-center' data-testid={TEST_ID.BOARD_CONTAINER}>
            <h1 ref={announcerRef} />
            <div className='grid grid-cols-[repeat(3,min-content)]' ref={boardRef} data-testid={TEST_ID.CELL_CONTAINER}>
                {cells}
            </div>
            <button onClick={onPlayAgain} hidden ref={playAgainRef}>Play Again</button>
        </div>
    )
}
