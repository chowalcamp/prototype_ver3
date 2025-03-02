'use client'

import PoolForm from '@/components/pool/poolForm'
import ThemeContext from '@/context/theme-context'
import { TokenList } from '@/types'
import { useContext, useEffect, useState } from 'react'

const TOKEN_LIST_URL = 'https://ipfs.io/ipns/tokens.uniswap.org'

export default function LiquidityPage() {
  const { isLight } = useContext(ThemeContext)
  const [tokenList, setTokenList] = useState<TokenList[]>([])
  const [tokenA, setTokenA] = useState('')
  const [tokenB, setTokenB] = useState('')
  const [amountA, setAmountA] = useState('')
  const [amountB, setAmountB] = useState('')

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch(TOKEN_LIST_URL)
        const data = await response.json()
        setTokenList(data.tokens.slice(0, 20)) // 상위 50개 토큰만 반환
      } catch (error) {
        console.error('토큰 리스트를 불러오는 중 오류 발생:', error)
      }
    }
    fetchTokens()
  }, [])

  const handleTokenAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenA(e.target.value)
  }

  const handleTokenBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenB(e.target.value)
  }

  const handleAmountAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountA(e.target.value)
  }

  const handleAmountBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountB(e.target.value)
  }

  return (
    <div className={isLight ? styles.containerLight : styles.containerDark}>
      <div className="w-[100%] h-full flex justify-center items-start">
        <PoolForm
          tokenList={tokenList}
          tokenA={tokenA}
          tokenB={tokenB}
          handleTokenAChange={handleTokenAChange}
          handleTokenBChange={handleTokenBChange}
          amountA={amountA}
          amountB={amountB}
          handleAmountAChange={handleAmountAChange}
          handleAmountBChange={handleAmountBChange}
        />
      </div>
    </div>
  )
}

const styles = {
  containerLight:
    'w-full h-screen bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 overflow-hidden relative pt-20',
  containerDark:
    'w-full h-screen bg-gradient-to-r from-indigo-800 via-blue-900 to-zinc-800 overflow-hidden relative pt-20',
}
