import type { NextPage } from 'next'

import Head from 'next/head'

import { Grid } from '~/components/Grid'

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
                <Grid width={3} height={3} />
            </main>
        </>
    )
}

export default Home
