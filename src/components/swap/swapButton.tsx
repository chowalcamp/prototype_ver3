'use client' // 클라이언트 컴포넌트로 지정

import React, { useContext } from 'react'
import ThemeContext from '@/context/theme-context'
import { useAccountContext } from '@/context/account-context'
import { useConnect } from 'wagmi'

type SwapButtonProps = {
  setLoginModalOpen(val: boolean): void
  trySwap(): void
}

const SwapButton = ({
  setLoginModalOpen,
  trySwap,
}: SwapButtonProps): JSX.Element => {
  const { isLight } = useContext(ThemeContext)
  const { isConnected } = useAccountContext()
  const { connectors, connect } = useConnect()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!isConnected) {
      connect({ connector: connectors[0] })
    } else {
      trySwap()
    }
  }

  return (
    <button
      className={isLight ? styles.lightContainer : styles.darkContainer}
      onClick={handleClick}
    >
      <div className={isLight ? styles.lightButton : styles.darkButton}>
        {isConnected ? 'Swap' : 'Connect Wallet'}
      </div>
    </button>
  )
}

const styles = {
  lightContainer: 'border-orange-300 h-16 w-full rounded-3xl',
  darkContainer: 'border-blue-500 h-16 w-full rounded-3xl',
  lightButton:
    'h-full w-full rounded-3xl flex justify-center items-center bg-orange-500 text-white font-semibold cursor-pointer',
  darkButton:
    'h-full w-full rounded-3xl flex justify-center items-center bg-blue-500 text-white font-semibold cursor-pointer',
}

export default SwapButton
