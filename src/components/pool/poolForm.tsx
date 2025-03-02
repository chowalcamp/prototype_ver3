'use client' // 클라이언트 컴포넌트로 지정

import React, { useContext, useEffect, useState } from 'react'
import SwapFormHeader from '@/components/swap/swapFormHeader'
import SwapFormInput from '@/components/swap/swapFormInput'
import SwapButton from '@/components/swap/swapButton'
import ThemeContext from '@/context/theme-context'
import type { TokenList } from '@/types'
import type { SelectedToken } from '@/types'
import { useTranslation } from 'react-i18next'
import PoolFormInput from './poolFormInput'
import SwapFormChangeTokenButton from '../swap/swapFormChangeTokenButton'
import TokenSelectModal from '../UI/TokenSelectModal'
import PoolButton from './poolButton'

type PoolFormProps = {
  tokenList: TokenList[]
  tokenA: string
  tokenB: string
  handleTokenAChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleTokenBChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  amountA: string
  amountB: string
  handleAmountAChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAmountBChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PoolForm = ({
  tokenList,
  tokenA,
  tokenB,
  handleTokenAChange,
  handleTokenBChange,
  amountA,
  amountB,
  handleAmountAChange,
  handleAmountBChange,
}: PoolFormProps): JSX.Element => {
  const { isLight } = useContext(ThemeContext)
  const [firstToken, setFirstToken] = useState<SelectedToken>({
    decimals: 0,
  })
  const [secondToken, setSecondToken] = useState<SelectedToken>({
    decimals: 0,
  })
  const [firstAmount, setFirstAmount] = useState<number | undefined | string>()
  const [secondAmount, setSecondAmount] = useState<
    number | undefined | string
  >()
  const [gas, setGas] = useState<number | undefined | string>()
  const [isSelecting, setIsSelecting] = useState(false)

  const getQuoteFirst = async (val: string) => {
    const amount = Number(Number(val) * 10 ** firstToken.decimals)
    setFirstAmount(val)
    if (amount === 0 || amount === undefined) {
      setFirstAmount('')
      setSecondAmount('')
      setGas(undefined)
      setTimeout(() => {
        if (secondAmount !== '') {
          setSecondAmount('')
        }
      }, 300)
    } else if (firstToken.address && secondToken.address) {
      //   const quote = await Moralis.Plugins.oneInch.quote({
      //     chain,
      //     fromTokenAddress: firstToken.address,
      //     toTokenAddress: secondToken.address,
      //     amount,
      //   });
      //   setSecondAmount(quote.toTokenAmount / 10 ** quote.toToken.decimals);
      //   setGas(quote.estimatedGas);
    }
  }

  const getQuoteSecond = async (val: string) => {
    const amount = Number(Number(val) * 10 ** secondToken.decimals)
    setSecondAmount(val)
    if (amount === 0 || amount === undefined) {
      setFirstAmount('')
      setSecondAmount('')
      setGas(undefined)
      setTimeout(() => {
        if (firstAmount !== '') {
          setFirstAmount('')
        }
      }, 300)
    } else if (firstToken.address && secondToken.address) {
      // const quote = await Moralis.Plugins.oneInch.quote({
      //     chain,
      //     fromTokenAddress: secondToken.address,
      //     toTokenAddress: firstToken.address,
      //     amount,
      // });
      //   setFirstAmount(quote.toTokenAmount / 10 ** quote.toToken.decimals);
      //   setGas(quote.estimatedGas);
    }
  }

  const makeSwap = async () => {
    // const amount = Number(Number(firstAmount) * 10 ** firstToken.decimals);
    // const address = await Moralis.User.current()?.get("ethAddress");

    // try {
    // try {
    //   const res = await Moralis.Plugins.oneInch.swap({
    //     chain: chain,
    //     fromTokenAddress: firstToken.address,
    //     toTokenAddress: secondToken.address,
    //     amount,
    //     fromAddress: address,
    //     slippage: 1,
    //   });
    // openTransactionModal(true)
    //   getTxHash(res.transactionHash);
    // setMadeTx(true)
    // } catch (error) {
    //   let message;
    //   if (error instanceof Error) message = error.message;
    //   else message = String((error as Error).message);
    //   getErrorMessage(message);
    // }
    alert('유동성 풀 추가')

    setFirstAmount('')
    setSecondAmount('')
    setGas('')
  }

  return (
    <form className={isLight ? styles.light : styles.dark}>
      <div className="w-full rounded-3xl p-2 select-none">
        <SwapFormHeader />
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-1/2 h-full flex flex-col gap-2 mt-2">
            <p className="text-white text-left pl-2">CHOOSE TOKEN PAIR</p>
            <div className="flex items-center gap-2">
              <SwapFormChangeTokenButton
                initial={true}
                select={setIsSelecting}
                selected={firstToken}
              />
              <p className="text-white">+</p>
              <SwapFormChangeTokenButton
                initial={false}
                select={setIsSelecting}
                selected={secondToken}
              />
              {isSelecting && (
                <TokenSelectModal
                  tokenList={tokenList}
                  select={setIsSelecting}
                  choose={setSecondToken}
                  isSelecting={setIsSelecting}
                />
              )}
            </div>
            <PoolFormInput
              initial={true}
              tokenList={tokenList}
              choose={setFirstToken}
              selected={firstToken}
              getQuote={getQuoteFirst}
              value={firstAmount}
              changeValue={setFirstAmount}
              changeCounterValue={setSecondAmount}
            />
            <PoolFormInput
              tokenList={tokenList}
              choose={setSecondToken}
              selected={secondToken}
              getQuote={getQuoteSecond}
              value={secondAmount}
              changeValue={setSecondAmount}
              changeCounterValue={setFirstAmount}
            />
            <PoolButton />
          </div>
          <div className="w-1/2 h-full">
            트랜젝션 설정, 그래프, 가격및 풀 지분 자리
          </div>
        </div>
      </div>
    </form>
  )
}

const styles = {
  light:
    'border-2 border-orange-400 bg-orange-400 rounded-3xl h-90 w-11/12 sm:w-[1000px]',
  dark:
    'border-2 border-blue-700 bg-blue-700 rounded-3xl h-90 w-11/12 sm:w-[1000px]',
}

export default PoolForm
