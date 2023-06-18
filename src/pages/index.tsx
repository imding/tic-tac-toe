import type { DehydratedState } from '@tanstack/react-query'
import type { NextPage } from 'next'

import Head from 'next/head'

import { dehydrate, QueryClient } from '@tanstack/react-query'

import { GameInitialisation } from '~/components/GameInitialisation'

export type PageProps = {
    dehydratedState?: DehydratedState
}

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Tic-tac-toe</title>
                <meta name='description' content='Tic-tac-toe Game' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]'>
                <h1 className='text-white'>Tic-tac-toe</h1>
                <GameInitialisation />
            </main>
        </>
    )
}

export async function getStaticProps(): Promise<{ props: PageProps }> {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['games'],
        // fetch game history from remote
        queryFn: () => []
    })

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}

export default Home
