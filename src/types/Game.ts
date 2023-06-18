import type { Player } from './Player'

export type Move = {
    byPlayerIdx: number
    row: number
    col: number
}

export type Game = {
    moves: Array<Move>
    players: [Player, Player]
}
