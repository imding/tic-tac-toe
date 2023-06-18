import type { Game } from '~/types/Game'

import { get } from 'idb-keyval'
import { useQuery } from '@tanstack/react-query'

import { Q } from '~/constants/queryKeys'

export const useUnfinishedGame = () => {
    const { data: game, ...rest } = useQuery({
        queryKey: [Q.UNFINISHED_GAME],
        queryFn: async () => {
            const result = await get<Game>(Q.UNFINISHED_GAME).catch((reason: string) => {
                console.warn('Failed to fetch unfinished game from IDB.')
                throw new Error(reason)
            })

            if (!result) {
                return null
            }

            return result
        },
        staleTime: Infinity
    })

    return { game, ...rest }
}
