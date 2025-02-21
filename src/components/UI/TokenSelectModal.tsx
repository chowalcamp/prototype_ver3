'use client' // 클라이언트 컴포넌트로 지정

import React, { useContext, useEffect, useState } from 'react'
import { XIcon } from '@heroicons/react/solid'
import { TokenDetails, TokenList } from '@/types' // 경로 조정
import ThemeContext from '@/context/theme-context' // 경로 조정
import type { SelectedToken } from '@/types' // 경로 조정
import { DebounceInput } from 'react-debounce-input'
import TokenListItem from './TokenListItem'

type TokenSelectModalProps = {
  initial?: boolean
  tokenList: TokenList
  select(val: boolean): void
  choose(val: SelectedToken): void
  isSelecting(val: boolean): void
}

const TokenSelectModal = ({
  tokenList,
  select,
  choose,
  isSelecting,
}: TokenSelectModalProps): JSX.Element => {
  const themeCtx = useContext(ThemeContext)
  const [searchedValue, setSearchedValue] = useState('')
  const [customTokenList, setCustomTokenList] = useState<TokenDetails[]>(
    tokenList,
  )

  useEffect(() => {
    if (searchedValue.slice(0, 2).includes('0x')) {
      const filteredList = tokenList.filter((token) =>
        token.address
          .toLocaleLowerCase()
          .includes(searchedValue.toLocaleLowerCase()),
      )
      setCustomTokenList(filteredList)
    } else {
      const filteredList = tokenList.filter((token) =>
        token.symbol.includes(searchedValue.toUpperCase()),
      )
      setCustomTokenList(filteredList)
    }

    if (searchedValue.length === 0) {
      setCustomTokenList(tokenList)
    }
  }, [searchedValue, tokenList])

  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen bg-gray-500 z-30 opacity-20"></div>
      <div className={themeCtx.isLight ? styles.light : styles.dark}>
        {/* Modal Header */}
        <div className="h-10 w-full flex flex-row justify-between items-center px-5">
          <span className="font-semibold text-lg">Select a token</span>
          <XIcon className="h-6 w-6" onClick={() => select(false)} />
        </div>

        {/* Modal Search Bar */}
        <div className="h-24 p-3 pb-5 border-b border-b-gray-200">
          <DebounceInput
            debounceTimeout={300}
            className="border border-gray-200 w-full h-full rounded-2xl px-3"
            placeholder="Search"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchedValue(e.target.value)
            }
          />
        </div>

        {/* Modal List  */}
        <div className="flex-1 p-4 overflow-hidden">
          {customTokenList && (
            <ul className="w-full h-full overflow-y-scroll">
              {customTokenList.map(
                ({ logoURI, name, symbol, address, decimals }) => (
                  <TokenListItem
                    key={address}
                    logo={logoURI}
                    name={name}
                    symbol={symbol}
                    choose={choose}
                    isSelecting={isSelecting}
                    address={address}
                    decimals={decimals}
                  />
                ),
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default TokenSelectModal

const styles = {
  dark:
    'absolute w-screen h-[70%] bottom-0 left-0 bg-blue-800 rounded-t-2xl z-40 py-5 flex flex-col md:w-[450px] md:h-[450px] md:m-auto md:top-0 md:right-0 md:rounded-xl md:py-2 md:pb-0',
  light:
    'absolute w-screen h-[70%] bottom-0 left-0 bg-white rounded-t-2xl z-40 py-5 flex flex-col md:w-[450px] md:h-[450px] md:m-auto md:top-0 md:right-0 md:rounded-xl md:py-2 md:pb-0',
}
