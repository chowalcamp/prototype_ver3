'use client' // 클라이언트 컴포넌트로 지정

import React, { useContext } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import ethLogo from '../../../public/images/eth.png'
import maticLogo from '../../../public/images/matic.svg'
import bscLogo from '../../../public/images/bsc.png'
import { useTranslation } from 'react-i18next'
import ThemeContext from '@/context/theme-context'
import ChainContext from '@/context/chain-context'
import type { SelectedToken } from '@/types'
import Image from 'next/image'

type SwapFormChangeTokenButtonProps = {
  initial?: boolean
  select(val: boolean): void
  selected: SelectedToken
}

const SwapFormChangeTokenButton = ({
  initial,
  select,
  selected,
}: SwapFormChangeTokenButtonProps): JSX.Element => {
  const { t } = useTranslation()
  const { isLight } = useContext(ThemeContext)
  const chainCtx = useContext(ChainContext)

  return (
    <div
      className={`flex whitespace-nowrap ml-1 rounded-3xl p-2 cursor-pointer ${
        initial
          ? `${isLight ? styles.changeLight : styles.changeDark}`
          : `${isLight ? styles.changeLight : styles.changeDark}`
      }`}
      onClick={() => select(true)}
    >
      {initial && !selected.name && chainCtx.chain === 'eth' && (
        <Image src={ethLogo} alt="" className="h-6 w-6" />
      )}
      {initial && !selected.name && chainCtx.chain === 'polygon' && (
        <Image src={maticLogo} alt="" className="h-6 w-6" />
      )}
      {initial && !selected.name && chainCtx.chain === 'bsc' && (
        <Image src={bscLogo} alt="" className="h-6 w-6" />
      )}
      {/* {selected.name && (
        <Image src={selected.logo} alt="" className="h-6 w-6" />
      )} */}
      <span
        className={`flex items-center ${select.name && 'pr-2 ml-1'} ${
          initial && 'pr-2'
        } text-sm md:text-base`}
      >
        {selected.name && selected.symbol}
        {initial && chainCtx.chain === 'eth' && !selected.name && 'ETH'}
        {initial && chainCtx.chain === 'bsc' && !selected.name && 'BNB'}
        {initial && chainCtx.chain === 'polygon' && !selected.name && 'MATIC'}
        {!initial && !selected.name && t('swap_form.select')}
        <ChevronDownIcon
          className={`h-4 w-4 ${initial && 'mr-2'} ${select.name && 'mr-2'}`}
        />
      </span>
    </div>
  )
}

const styles = {
  changeLight: 'bg-orange-400 text-gray-200 ',
  changeDark: 'bg-blue-400 text-gray-200',
}

export default SwapFormChangeTokenButton
