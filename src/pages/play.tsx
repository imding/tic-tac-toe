import type { NextPage } from 'next'

const PlayPage: NextPage = () => {
    // const activePlayerRef = useRef<Player>()
    // const p1 = { name: 'Ding', symbol: '😈' }
    // const p2 = { name: 'AI', symbol: '🤖' }
    // const commonCellProps: Omit<CellProps, 'row' | 'col'> = {
    //     getActivePlayer: () => activePlayerRef.current,
    //     toggleActivePlayer: () => {
    //         activePlayerRef.current = activePlayerRef.current.symbol === p1.symbol ? p2 : p1
    //     }
    // }

    // return (
    //     <div>
    //         <Cell row={0} col={0} {...commonCellProps} />
    //         <Cell row={0} col={1} {...commonCellProps} />
    //     </div>
    // )
    return <div>play</div>
}

export default PlayPage
