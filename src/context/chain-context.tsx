// 'use client' // 클라이언트 컴포넌트로 지정

// import React, { useState } from 'react'
// import type { Chain } from '@/types'

// export const ChainContext = React.createContext({
//   chain: 'eth' as Chain,
//   changeChain: (val: Chain) => {},
// })

// type ChainProviderProps = {
//   children: React.ReactNode
// }

// export const ChainContextProvider = ({
//   children,
// }: ChainProviderProps): JSX.Element => {
//   const [currChain, setCurrChain] = useState<Chain>('eth')

//   const changeChain = (val: Chain) => {
//     setCurrChain(val)
//   }

//   return (
//     <ChainContext.Provider value={{ chain: currChain, changeChain }}>
//       {children}
//     </ChainContext.Provider>
//   )
// }

// export default ChainContext
