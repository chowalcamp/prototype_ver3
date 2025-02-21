// prototype_v3/src/app/components/NavBar/NavBar.tsx
'use client' // 클라이언트 컴포넌트로 지정

import React from 'react'
import ChooseNetwork from './ChooseNetwork'
import MoreOptionsDropDown from './MoreOptionsDropDown'
import NavLogo from './NavLogo'
import NavTabSwitcher from './NavTabSwitcher'
import ThemeContext from '@/context/theme-context'
import { ChevronDownIcon, DotsHorizontalIcon } from '@heroicons/react/solid'
import useWindowWidth from '@/hooks/useWindowWidth'
import { Chain } from '@/types'
import ethLogo from '../../../public/images/eth.png'
import bscLogo from '../../../public/images/bsc.png'
import maticLogo from '../../../public/images/matic.svg'
import Image from 'next/image'

type NavBarProps = {
  loginModalOpen: boolean
  setLoginModalOpen(val: boolean): void
  className: string
}

const NavBar = ({
  className,
  loginModalOpen,
  setLoginModalOpen,
}: NavBarProps): JSX.Element => {
  const { isLight } = React.useContext(ThemeContext)
  const windowWidth = useWindowWidth()
  const isDesktop = windowWidth ? windowWidth >= 920 : false
  const isBigDesktop = windowWidth ? windowWidth >= 1250 : false
  const [chooseNetwork, setChooseNetwork] = React.useState(false)
  const [activeChain, setActiveChain] = React.useState<Chain>('eth')
  const [showOptions, setShowOptions] = React.useState(false)

  return (
    <nav
      className={`w-full h-20 p-3 mb-28 ${
        isLight
          ? ' bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700'
          : 'bg-gradient-to-r from-indigo-800 via-blue-900 to-zinc-800'
      } flex items-center justify-between p-3`}
    >
      <NavLogo />
      {isDesktop && <NavTabSwitcher />}
      <div className="space-x-2 h-12 flex justify-end">
        <div
          className={`flex items-center rounded-2xl ${
            isLight ? 'bg-white' : 'bg-blue-600'
          } p-2 select-none relative`}
          onMouseEnter={() => setChooseNetwork(true)}
        >
          {activeChain === 'eth' && (
            <Image src={ethLogo} alt="token logo" className="h-6 w-6 mr-1" />
          )}
          {activeChain === 'polygon' && (
            <Image src={maticLogo} alt="token logo" className="h-6 w-6 mr-1" />
          )}
          {activeChain === 'bsc' && (
            <Image src={bscLogo} alt="token logo" className="h-6 w-6 mr-1" />
          )}
          {isBigDesktop && (
            <span
              className={`flex items-center mr-1 text-sm select-none ${
                isLight ? 'text-black' : 'text-white'
              }`}
            >
              {activeChain === 'eth' && 'Ethereum'}
              {activeChain === 'polygon' && 'Polygon'}
              {activeChain === 'bsc' && 'BSC'}
            </span>
          )}
          <ChevronDownIcon
            className={`h-4 w-4 ${isLight ? 'text-black' : 'text-white'}`}
          />
          {chooseNetwork && (
            <ChooseNetwork
              isChoosing={setChooseNetwork}
              activeChain={activeChain}
              chooseChain={setActiveChain}
            />
          )}
        </div>

        <div
          className={isLight ? styles.lightButton : styles.darkButton}
          onClick={() => setLoginModalOpen(true)}
        >
          Connect Wallet
        </div>
        <div
          className={`flex items-center justify-center rounded-2xl py-2 px-3 ${
            isLight ? 'bg-white' : 'bg-blue-600'
          }`}
        >
          <span
            className="h-full w-full flex items-center cursor-pointer"
            onClick={() => setShowOptions(!showOptions)}
          >
            <DotsHorizontalIcon
              className={`h-5 w-5 ${isLight ? ['fill-black'] : 'fill-white'}`}
            />
          </span>
          {showOptions && <MoreOptionsDropDown showOptions={setShowOptions} />}
        </div>
      </div>
    </nav>
  )
}

export default NavBar

const styles = {
  lightButton:
    'bg-orange-300 rounded-2xl p-2 border-2 border-white text-white text-light text-sm md:w-40 cursor-pointer select-none flex justify-center items-center',
  darkButton:
    'bg-blue-500 rounded-2xl p-2 border-2 border-blue-400 text-white text-light text-sm md:w-40 cursor-pointer select-none flex justify-center items-center',
  connectLight:
    'rounded-2xl bg-white flex justify-between items-center flex-1 max-w-[220px] p-1 font-bold md:max-w-[220px] cursor-pointer',
  connectDark:
    'rounded-2xl bg-blue-600 flex justify-between items-center flex-1 max-w-[220px] text-white p-1 font-bold md:max-w-[220px] cursor-pointer',
  addressLight:
    'text-sm flex-1 rounded-2xl h-full bg-gray-200 flex items-center justify-center',
  addressDark:
    'text-sm flex-1 rounded-2xl h-full bg-blue-500 flex items-center justify-center',
}
