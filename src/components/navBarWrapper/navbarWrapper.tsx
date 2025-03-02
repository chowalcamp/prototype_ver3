'use client' // 클라이언트 컴포넌트로 지정

import ThemeContext from '@/context/theme-context'
import React, { useContext, useState } from 'react'
import NavBar from '../NavBar/NavBar'

const NavBarWrapper = () => {
  const { isLight } = useContext(ThemeContext)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <NavBar
      className={isLight ? styles.containerLight : styles.containerDark}
    />
  )
}

export default NavBarWrapper

const styles = {
  containerLight:
    'w-screen h-screen bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 overflow-hidden relative mb-0',
  containerDark:
    'w-screen h-screen bg-gradient-to-r from-indigo-800 via-blue-900 to-zinc-800 overflow-hidden relative mb-0',
}
