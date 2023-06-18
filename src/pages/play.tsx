import type { NextPage } from 'next'

import Head from 'next/head'

import { Board } from '~/components/Board'
import { useRouter } from 'next/router'
import { useUnfinishedGame } from '~/hooks/useUnfinishedGame'

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
        <>
            <Head>
                <title>Tic-tac-toe</title>
                <meta name='description' content='Tic-tac-toe Game' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]'>
                <h1 className='text-white'>Tic-tac-toe</h1>
                <Board game={game} />
            </main>
        </>
    )
}

export default PlayPage
