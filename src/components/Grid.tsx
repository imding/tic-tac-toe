import type { FC } from 'react'

type GridProps = {
    width: number
    height: number
}

export const Grid: FC<GridProps> = ({ width, height }) => {
    const cells = []

    for (let i = 0; i < width * height; i++) {
        cells.push(<div key={i} />)
    }

    return <div>{...cells}</div>
}
