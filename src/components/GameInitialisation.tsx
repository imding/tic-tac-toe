import type { Player } from '~/types/Player'
import type { ComponentProps, FC } from 'react'

import { set } from 'idb-keyval'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import { Q } from '~/constants/queryKeys'
import { useUnfinishedGame } from '~/hooks/useUnfinishedGame'
import { aiName, aiSymbol, playerSymbols } from '~/constants/playerInfo'

export const GameInitialisation: FC = () => {
    const router = useRouter()
    const { game, error, isLoading } = useUnfinishedGame()

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        console.warn(JSON.stringify(error))
    }

    if (game) {
        void router.push('play')
        return null
    }

    return <NewGame />
}

const NewGame: FC = () => {
    const [isPvp, setIsPvp] = useState(true)
    const p1InfoRef = useRef<Player>()
    const p2InfoRef = useRef<Player>()
    const queryClient = useQueryClient()
    const startGame = () => {
        if (!p1InfoRef.current || !p2InfoRef.current) {
            return alert('Please give each player a name and a symbol.')
        }

        if (p1InfoRef.current?.name === p2InfoRef.current?.name) {
            return alert('Players should pick a unique name.')
        }

        if (p1InfoRef.current?.symbol === p2InfoRef.current?.symbol) {
            return alert('Players should pick a unique symbol.')
        }

        const newGame = { moves: [], players: [p1InfoRef.current, p2InfoRef.current] }

        void set(Q.UNFINISHED_GAME, newGame).then(() => {
            queryClient.setQueryData([Q.UNFINISHED_GAME], newGame)
        })
    }

    return (
        <div className='grid grid-cols-2 gap-2'>
            {/* <div className='col-span-2 text-center'>
                <button onClick={() => setIsPvp(false)} className={`px-2 ${isPvp ? 'opacity-50' : ''}`}>Single player</button>
                <button onClick={() => setIsPvp(true)} className={`px-2 ${isPvp ? '' : 'opacity-50'}`}>Multi-player</button>
            </div> */}
            <PlayerInfoEditor label='Player 1' ref={p1InfoRef} />
            <PlayerInfoEditor label='Player 2' isAi={!isPvp} ref={p2InfoRef} />
            <button onClick={startGame} className='col-span-2'>Play</button>
        </div>
    )
}

type PlayerInfoEditorProps = {
    label: 'Player 1' | 'Player 2'
    isAi?: boolean
}

const PlayerInfoEditor = forwardRef<Player | undefined, PlayerInfoEditorProps>(
    function PlayerInfoEditor({ isAi, label }, ref) {
        const [name, setName] = useState<string>(isAi ? aiName : '')
        const [selectedSymbol, setSelectedSymbol] = useState<string>(isAi ? aiSymbol : '')

        useImperativeHandle(ref, () => {
            if (name && selectedSymbol) {
                return {
                    name: isAi ? aiName : name,
                    symbol: isAi ? aiSymbol : selectedSymbol,
                    index: label === 'Player 1' ? 0 : 1
                }
            }
        }, [isAi, label, name, selectedSymbol])

        return (
            <div className='border p-2'>
                <p>{label}</p>
                <div>
                    <span>Name: </span>
                    {isAi
                        ? <span>{aiName}</span>
                        : <input value={name} onChange={({ currentTarget }) => setName(currentTarget.value)} />}
                </div>
                <span>Symbol: </span>
                {isAi
                    ? <span>{aiSymbol}</span>
                    : playerSymbols.map((symbol, idx) => {
                        const symbolProps: ComponentProps<'span'> = {
                            className: `cursor-pointer ${selectedSymbol === symbol ? '' : 'opacity-50'}`,
                            onClick: () => setSelectedSymbol(symbol)
                        }

                        return <span {...symbolProps} key={idx}>{symbol}</span>
                    })}
            </div >
        )
    }
)
