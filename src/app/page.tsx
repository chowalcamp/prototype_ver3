// prototype_v3/src/app/swap/page.tsx
'use client' // 클라이언트 컴포넌트로 지정

import React, { useContext, useEffect, useState } from 'react'
// import { useMoralis, useChain, useOneInchTokens } from 'react-moralis'
import ThemeContext from '@/context/theme-context'
import SwapResultModal from '@/components/swap/swapResultModal' // 경로 조정
import { TokenList } from '@/types' // 경로 조정
import SwapForm from '@/components/swap/swapForm'
import NavBar from '@/components/NavBar/NavBar'

const TOKEN_LIST_URL = 'https://ipfs.io/ipns/tokens.uniswap.org'

const Swap: React.FC = () => {
  const { isLight } = useContext(ThemeContext)
  const [tokenList, setTokenList] = useState<TokenList[]>([])
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [madeTx, setMadeTx] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

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

  const closeModal = () => {
    setShowTransactionModal(false)
    setTxHash('')
    setErrorMessage('')
  }

  // useEffect(() => {
  //   const getTokens = async () => {
  //     // initialize()
  //     // await getSupportedTokens()
  //   }

  //   // if (data.length === 0) {
  //   //   getTokens()
  //   // } else {
  //   //   const formattedData = JSON.parse(JSON.stringify(data!, null, 2))
  //   //   setTokenList(Object.values(formattedData.tokens))
  //   // }
  // }, [])

  return (
    <div className={isLight ? styles.containerLight : styles.containerDark}>
      {showTransactionModal && (
        <SwapResultModal
          closeModal={closeModal}
          txHash={txHash}
          errorMessage={errorMessage}
        />
      )}
      <div className="w-full h-full flex justify-center items-start">
        <SwapForm
          tokenList={tokenList}
          setLoginModalOpen={() => {}}
          openTransactionModal={() => {}}
          getTxHash={() => {}}
          getErrorMessage={() => {}}
          setMadeTx={setMadeTx}
        />
      </div>
    </div>
  )
}

export default Swap

const styles = {
  containerLight:
    'w-full h-screen bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 overflow-hidden relative pt-20',
  containerDark:
    'w-screen h-screen bg-gradient-to-r from-indigo-800 via-blue-900 to-zinc-800 overflow-hidden relative pt-20',
}
