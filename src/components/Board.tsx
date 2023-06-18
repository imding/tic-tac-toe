import type { FC } from 'react'
// import type { Game } from '~/types/Game'

// import { useQuery } from '@tanstack/react-query'
// import { del, get, set } from 'idb-keyval'

// import { Q } from '~/constants/queryKeys'

// const width = 3
// const height = 3

export const Board: FC = () => {
    // const cells = []
    // const { data: unfinishedGame, error, isLoading } = useQuery([Q.UNFINISHED_GAME], async () => {
    //     const result = await get<Game>(Q.UNFINISHED_GAME).catch((reason: string) => {
    //         console.warn('Failed to fetch unfinished game from IDB.')
    //         throw new Error(reason)
    //     })

    //     if (!result) {
    //         return null
    //     }

    //     return result
    // })

    // if (isLoading) {
    //     return <p>Loading...</p>
    // }

    // if (error) {
    //     return <p>{JSON.stringify(error)}</p>
    // }

    // for (let r = 0; r < height; r++) {
    //     for (let c = 0; c < width; c++) {
    //         const [ox, oy] = unfinishedGame?.moves || []

    //         if (c === ox && r === oy) {

    //         }
    //     }
    // }

    return <div>Board</div>
}
