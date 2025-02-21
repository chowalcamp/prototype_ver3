// prototype_v3/src/app/swap/page.tsx
'use client' // 클라이언트 컴포넌트로 지정

import React, { useContext, useEffect, useState } from 'react'
// import { useMoralis, useChain, useOneInchTokens } from 'react-moralis'
import ThemeContext from '@/context/theme-context'
import ChainContext from '@/context/chain-context'
import SwapResultModal from '@/components/swap/swapResultModal' // 경로 조정
import { TokenList } from '@/types' // 경로 조정
import SwapForm from '@/components/swap/swapForm'
import NavBar from '@/components/NavBar/NavBar'

const Swap: React.FC = () => {
  const chainCtx = useContext(ChainContext)
  const { isLight } = useContext(ThemeContext)
  // const { isAuthenticated, isInitialized, initialize } = useMoralis()
  // const { switchNetwork } = useChain()
  // const { getSupportedTokens, data } = useOneInchTokens({
  //   chain: chainCtx.chain,
  // })
  const [tokenList, setTokenList] = useState<TokenList | []>([])
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [madeTx, setMadeTx] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const closeModal = () => {
    setShowTransactionModal(false)
    setTxHash('')
    setErrorMessage('')
  }

  useEffect(() => {
    const updateNetwork = async () => {
      // if (isAuthenticated) {
      //   if (chainCtx.chain === 'eth') await switchNetwork('0x1')
      //   if (chainCtx.chain === 'bsc') await switchNetwork('0x38')
      //   if (chainCtx.chain === 'polygon') await switchNetwork('0x89')
      // }
    }
    // if (isInitialized) {
    //   updateNetwork()
    // }
  }, [chainCtx.chain])

  useEffect(() => {
    const getTokens = async () => {
      // initialize()
      // await getSupportedTokens()
    }

    // if (data.length === 0) {
    //   getTokens()
    // } else {
    //   const formattedData = JSON.parse(JSON.stringify(data!, null, 2))
    //   setTokenList(Object.values(formattedData.tokens))
    // }
  }, [])

  return (
    <div className={isLight ? styles.containerLight : styles.containerDark}>
      <NavBar
        className={isLight ? styles.containerLight : styles.containerDark} // 스타일 추가
        loginModalOpen={isLoginModalOpen}
        setLoginModalOpen={setIsLoginModalOpen}
      />
      {showTransactionModal && (
        <SwapResultModal
          closeModal={closeModal}
          txHash={txHash}
          errorMessage={errorMessage}
        />
      )}
      <div className="w-full h-full flex justify-center items-start mt-32">
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
    'w-screen h-screen bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 overflow-hidden relative',
  containerDark:
    'w-screen h-screen bg-gradient-to-r from-indigo-800 via-blue-900 to-zinc-800 overflow-hidden relative',
}
