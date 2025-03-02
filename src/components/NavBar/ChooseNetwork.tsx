'use client'

import React from 'react'
import ethLogo from '../../../public/images/eth.png'
import bscLogo from '../../../public/images/bsc.png'
import maticLogo from '../../../public/images/matic.svg'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import { useSwitchChain, useAccount } from 'wagmi'
import { mainnet, polygon, bsc } from 'wagmi/chains' // Wagmi에서 제공하는 체인 정보
import Image from 'next/image'
import { Chain } from '@/types'

type ChooseNetworkProps = {
  isChoosing(val: boolean): void
}

const ChooseNetwork = ({ isChoosing }: ChooseNetworkProps): JSX.Element => {
  const { chains, switchChain } = useSwitchChain()

  // 네트워크 선택 핸들러
  const handleChoice = (chainId: number) => {
    return (event: React.MouseEvent) => {
      event.preventDefault()
      switchChain({ chainId: chainId }) // Wagmi를 통해 네트워크 전환
      isChoosing(false) // 네트워크 선택 UI 닫기
    }
  }

  // 현재 활성화된 네트워크 확인
  // const activeChain = chains?.id

  return (
    <div
      className="absolute top-16 bg-white rounded-2xl min-w-[250px] min-h-40 p-4 z-10"
      onMouseLeave={() => isChoosing(false)}
    >
      {/* Header */}
      <div className="w-full h-8 text-base text-black font-semibold">
        Select a network
      </div>

      {/* Ethereum
      <div
        className={`w-full cursor-pointer rounded-lg ${
          activeChain === mainnet.id ? 'mb-3 p-4 bg-gray-100' : 'mb-4 p-2'
        }`}
      >
        <div
          className={`w-full flex items-center justify-between ${
            activeChain === mainnet.id ? 'mb-3' : ''
          }`}
          onClick={handleChoice(mainnet.id)} // Ethereum 네트워크로 전환
        >
          <div className="flex items-center">
            <Image src={ethLogo} alt="eth" className="h-5 w-5 mr-3" />
            <span>Ethereum</span>
          </div>
          {activeChain === mainnet.id && (
            <span className="w-2 h-2 bg-green-800 rounded-full"></span>
          )}
        </div>
        {activeChain === mainnet.id && (
          <a
            href="https://etherscan.io"
            target="_blank"
            rel="noreferrer"
            className="flex justify-between items-center w-full pl-1 hover:underline cursor-pointer"
          >
            <span className="text-black text-xs font-semibold underline-offset-1 mr-1">
              Ethereum Scan
            </span>
            <ExternalLinkIcon className="w-4 h-4 text-black" />
          </a>
        )}
      </div> */}

      {/* Polygon */}
      {/* <div
        className={`w-full cursor-pointer rounded-lg ${
          activeChain === polygon.id ? 'mb-3 p-4 bg-gray-100' : 'mb-4 p-2'
        }`}
      >
        <div
          className={`w-full flex items-center justify-between ${
            activeChain === polygon.id ? 'mb-3' : ''
          }`}
          onClick={handleChoice(polygon.id)} // Polygon 네트워크로 전환
        >
          <div className="flex items-center">
            <Image src={maticLogo} alt="matic" className="h-5 w-5 mr-3" />
            <span>Polygon</span>
          </div>
          {activeChain === polygon.id && (
            <span className="w-2 h-2 bg-green-800 rounded-full"></span>
          )}
        </div>
        {activeChain === polygon.id && (
          <a
            href="https://polygonscan.com/"
            target="_blank"
            rel="noreferrer"
            className="flex justify-between items-center w-full pl-1 hover:underline cursor-pointer"
          >
            <span className="text-black text-xs font-semibold underline-offset-1 mr-1">
              Polygon Scan
            </span>
            <ExternalLinkIcon className="w-4 h-4 text-black" />
          </a>
        )}
      </div> */}

      {/* BSC */}
      {/* <div
        className={`w-full cursor-pointer rounded-lg ${
          activeChain === bsc.id ? 'mb-3 p-4 bg-gray-100' : 'p-2'
        }`}
      >
        <div
          className={`w-full flex items-center justify-between ${
            activeChain === bsc.id ? 'mb-3' : ''
          }`}
          onClick={handleChoice(bsc.id)} // BSC 네트워크로 전환
        >
          <div className="flex items-center">
            <Image src={bscLogo} alt="bsc" className="h-5 w-5 mr-3" />
            <span>BSC</span>
          </div>
          {activeChain === bsc.id && (
            <span className="w-2 h-2 bg-green-800 rounded-full"></span>
          )}
        </div>
        {activeChain === bsc.id && (
          <a
            href="https://bscscan.com/"
            target="_blank"
            rel="noreferrer"
            className="flex justify-between items-center w-full pl-1 hover:underline cursor-pointer"
          >
            <span className="text-black-500 text-md font-semibold underline-offset-1 mr-1">
              BSC Scan
            </span>
            <ExternalLinkIcon className="w-4 h-4 text-black" />
          </a>
        )}
      </div> */}

      {chains.map((chain) => (
        <button
          key={chain.id}
          onClick={() => switchChain({ chainId: chain.id })}
        >
          Switch to {chain.name}
        </button>
      ))}
    </div>
  )
}

export default ChooseNetwork
