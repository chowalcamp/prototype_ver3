'use client' // 클라이언트 컴포넌트로 지정

import React, { useContext, useEffect, useState } from 'react'
import SwapFormHeader from '@/components/swap/swapFormHeader'
import SwapFormInput from '@/components/swap/swapFormInput'
import SwapButton from '@/components/swap/swapButton'
import ThemeContext from '@/context/theme-context'
import type { TokenList } from '@/types'
import type { SelectedToken } from '@/types'
import { useTranslation } from 'react-i18next'

type SwapFormProps = {
  tokenList: TokenList[]
  setLoginModalOpen(val: boolean): void
  openTransactionModal(val: boolean): void
  getTxHash(hash: string): void
  getErrorMessage(message: string): void
  setMadeTx(val: boolean): void
}

const SwapForm = ({
  tokenList,
  setLoginModalOpen,
  openTransactionModal,
  getTxHash,
  getErrorMessage,
  setMadeTx,
}: SwapFormProps): JSX.Element => {
  const { isLight } = useContext(ThemeContext)
  const { t } = useTranslation()
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

  // useEffect(() => {
  //   setFirstToken({
  //     address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  //     decimals: 18,
  //   })
  // }, [])

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

    openTransactionModal(true)

    // try {
    //   const res = await Moralis.Plugins.oneInch.swap({
    //     chain: chain,
    //     fromTokenAddress: firstToken.address,
    //     toTokenAddress: secondToken.address,
    //     amount,
    //     fromAddress: address,
    //     slippage: 1,
    //   });
    openTransactionModal(true)
    //   getTxHash(res.transactionHash);
    setMadeTx(true)
    // } catch (error) {
    //   let message;
    //   if (error instanceof Error) message = error.message;
    //   else message = String((error as Error).message);
    //   getErrorMessage(message);
    // }

    setFirstAmount('')
    setSecondAmount('')
    setGas('')
  }

  return (
    <form className={isLight ? styles.light : styles.dark}>
      <div className="w-full h-full rounded-3xl p-2 select-none">
        <SwapFormHeader />
        <SwapFormInput
          initial={true}
          tokenList={tokenList}
          choose={setFirstToken}
          selected={firstToken}
          getQuote={getQuoteFirst}
          value={firstAmount}
          changeValue={setFirstAmount}
          changeCounterValue={setSecondAmount}
        />
        <SwapFormInput
          tokenList={tokenList}
          choose={setSecondToken}
          selected={secondToken}
          getQuote={getQuoteSecond}
          value={secondAmount}
          changeValue={setFirstAmount}
          changeCounterValue={setFirstAmount}
        />
        {gas && (
          <div className="w-full h-3 flex items-center justify-center py-4">
            <div className="w-[95%] h-full flex items-center justify-end text-sm text-white font-semibold">
              {t('swap_form.estimated')}
              {gas}
            </div>
          </div>
        )}
        <SwapButton setLoginModalOpen={setLoginModalOpen} trySwap={makeSwap} />
      </div>
    </form>
  )
}

const styles = {
  light:
    'border-2 border-orange-400 bg-orange-400 rounded-3xl h-90 w-11/12 sm:w-[500px]',
  dark:
    'border-2 border-blue-700 bg-blue-700 rounded-3xl h-90 w-11/12 sm:w-[500px]',
}

export default SwapForm
