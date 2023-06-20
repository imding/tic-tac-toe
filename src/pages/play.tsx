import type { NextPage } from 'next'

import { useRouter } from 'next/router'

import { Board } from '~/components/Board'
import { useUnfinishedGame } from '~/hooks/useUnfinishedGame'
import { Layout } from '~/components/Layout'

const PlayPage: NextPage = () => {
    const router = useRouter()
    const { game, error, isLoading } = useUnfinishedGame()

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{JSON.stringify(error)}</p>
    }

    if (!game) {
        console.warn('No unfinished game, redirecting back to game initialisation page.')
        void router.push('/')
        return null
    }

    return (
        <Layout>
            <h1 className='text-white'>Player Info</h1>
            <Board dimension={new Array<number>(3).fill(0)} game={game} onPlayAgain={() => void router.push('/')} />
        </Layout>
    )
}

export default PlayPage
