'use client' // 클라이언트 컴포넌트로 지정

import React from 'react'
import ThemeContext from '@/context/theme-context'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useWindowWidth from '@/hooks/useWindowWidth'

const NavTabSwitcher = (): JSX.Element => {
  const windowWidth = useWindowWidth()
  const isDesktop = windowWidth ? windowWidth >= 920 : false
  const { isLight } = React.useContext(ThemeContext)
  const pathName = usePathname()

  return (
    <div
      className={`${
        isDesktop ? 'basis-2/4' : ''
      } h-5/6 flex items-center justify-center`}
    >
      <div className={isLight ? styles.light : styles.dark}>
        <Link
          href="/"
          className={`flex items-center justify-center rounded-3xl w-1/2 ${
            pathName === '/' && !isLight ? 'bg-blue-600 text-gray-50' : ''
          } ${pathName === '/' && isLight ? 'bg-white text-black' : ''} ${
            isLight ? 'text-black' : 'text-white'
          }`}
        >
          Swap
        </Link>
        <Link
          href="/liquidity"
          className={`flex items-center justify-center rounded-3xl w-full ${
            isLight && pathName !== '/' ? 'bg-white text-black' : ''
          } ${pathName !== '/' && !isLight ? 'bg-blue-600 text-gray-50' : ''} ${
            isLight ? 'text-black' : 'text-white'
          }`}
        >
          Liquidity Pool
        </Link>
      </div>
    </div>
  )
}

const styles = {
  light: 'w-52 h-full flex justify-evenly rounded-3xl bg-gray-200 select-none',
  dark: 'w-52 h-full flex justify-evenly rounded-3xl bg-blue-400 select-none',
}

export default NavTabSwitcher
