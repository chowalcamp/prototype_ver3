'use client'

import { useEffect, useState } from 'react'

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined)

  useEffect(() => {
    // 클라이언트에서만 실행
    setWindowWidth(window.innerWidth)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []) // 빈 배열 = 마운트 시 1회만 실행

  return windowWidth
}

export default useWindowWidth
