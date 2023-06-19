import type { Game, Move } from '~/types/Game'

export function getActivePlayer(moves: Array<Move>, players: Game['players']) {
    const lastMove = moves.findLast(Boolean)
    const lastMoveByPlayer = lastMove && players[lastMove.byPlayerIdx]
    return players[lastMoveByPlayer ? lastMoveByPlayer.index === 0 ? 1 : 0 : 0]
}

export function checkWinner(moves: Move[], dimension: Array<number>): boolean {
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
    const hasDiagonalLine =
        dimension.every((_, idx) => moves.find(({ row, col }) => row === idx && col === idx)) ||
        dimension.every((_, idx) => moves.find(({ row, col }) => row === idx && col === dimension.length - idx - 1))

    return hasStraightLine || hasDiagonalLine
}
