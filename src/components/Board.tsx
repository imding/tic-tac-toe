import type { CellProps } from './Cell'
import type { FC } from 'react'
import type { Player } from '~/types/Player'
import type { Game, Move } from '~/types/Game'

import { useRouter } from 'next/router'
import { del, get, set } from 'idb-keyval'
import { useEffect, useRef } from 'react'

import { Cell } from '~/components/Cell'
import { Q } from '~/constants/queryKeys'
import { useQueryClient } from '@tanstack/react-query'

type BoardProps = {
    game: Game
}

const dimension = new Array(3).fill(0)

function getActivePlayer(moves: Array<Move>, players: Game['players']) {
    const lastMove = moves.findLast(Boolean)
    const lastMoveByPlayer = lastMove && players[lastMove.byPlayerIdx]
    return players[lastMoveByPlayer ? lastMoveByPlayer.index === 0 ? 1 : 0 : 0]
}

function checkWinner(moves: Move[]): boolean {
    const result = moves.reduce((acc, { row, col }) => {
        const _row = acc.row[row]
        const _col = acc.col[col]
        acc.row[row] = _row ? _row + 1 : 1
        acc.col[col] = _col ? _col + 1 : 1
        return acc
    }, { row: {}, col: {} } as { row: { [k: number]: number }, col: { [k: number]: number } })

    const rowValues = Object.values(result.row)
    const colValues = Object.values(result.col)
    const hasStraightLine = Math.max(...rowValues, ...colValues) === dimension.length
    const hasDiagonalLine = new Set(Object.keys(result.row)).size === dimension.length && new Set(Object.keys(result.col)).size === dimension.length

    return hasStraightLine || hasDiagonalLine
}

export const Board: FC<BoardProps> = ({ game }) => {
    const router = useRouter()
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

                if (checkWinner(playerMoves)) {
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
        <div className='h-full grid place-items-center'>
            <h1 ref={announcerRef} />
            <div className='grid grid-cols-[repeat(3,min-content)]' ref={boardRef}>
                {cells}
            </div>
            <button onClick={() => void router.push('/')} hidden ref={playAgainRef}>Play Again</button>
        </div>
    )
}
