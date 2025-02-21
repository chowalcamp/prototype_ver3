// prototype_ver3/src/context/theme-context.tsx
'use client' // 클라이언트 컴포넌트로 지정

import React from 'react'

type ThemeContextProviderProps = {
  children: React.ReactNode
}

const ThemeContext = React.createContext({
  isLight: true,
  changeTheme: () => {},
})

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps): JSX.Element => {
  const [isLight, setIsLight] = React.useState(true)

  const changeThemeHandler = () => {
    setIsLight((prev) => !prev) // 이전 상태를 기반으로 토글
  }

  return (
    <ThemeContext.Provider value={{ isLight, changeTheme: changeThemeHandler }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext
