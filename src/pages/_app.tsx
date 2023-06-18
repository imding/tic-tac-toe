import type { AppType } from 'next/dist/shared/lib/utils'
import type { PageProps } from './index'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'

import '~/styles/globals.css'

const MyApp: AppType<PageProps> = ({ Component, pageProps }) => {
    const { dehydratedState, ...props } = pageProps
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={dehydratedState}>
                <Component {...props} />
            </Hydrate>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default MyApp
