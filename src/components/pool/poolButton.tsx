'use client' // 클라이언트 컴포넌트로 지정

import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '@/context/theme-context'
import { useAccountContext } from '@/context/account-context'
import { useConnect } from 'wagmi'

const PoolButton = (): JSX.Element => {
  const { isLight } = useContext(ThemeContext)
  const { isConnected, address } = useAccountContext()
  const [message, setMessage] = useState('Connect Wallet')
  const { connectors, connect } = useConnect()

  useEffect(() => {
    if (isConnected) {
      setMessage('Create Pool')
    } else {
      setMessage('Connect Wallet')
    }
  }, [isConnected])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (isConnected) {
      setMessage('Create Pool')
    } else {
      connect({ connector: connectors[0] })
    }
  }

  return (
    <button
      className={isLight ? styles.lightContainer : styles.darkContainer}
      onClick={handleClick}
    >
      <div className={isLight ? styles.lightButton : styles.darkButton}>
        {message}
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

export default PoolButton
