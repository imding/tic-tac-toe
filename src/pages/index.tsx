import type { DehydratedState } from '@tanstack/react-query'
import type { NextPage } from 'next'

import { dehydrate, QueryClient } from '@tanstack/react-query'

import { GameInitialisation } from '~/components/GameInitialisation'
import { Layout } from '~/components/Layout'

export type PageProps = {
    dehydratedState?: DehydratedState
}

const Home: NextPage = () => {
    return (
        <Layout>
            <h1 className='text-white'>Tic-tac-toe</h1>
            <GameInitialisation />
        </Layout>
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
