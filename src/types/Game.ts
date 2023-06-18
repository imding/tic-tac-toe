import type { Player } from './Player'

type Move = {
    byPlayer: Player
    row: number
    col: number
}

export type Game = {
    moves: Array<Move>
}
