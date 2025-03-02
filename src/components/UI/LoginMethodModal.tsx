// 'use client'

// import React, { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { XIcon } from '@heroicons/react/solid'
// // import { Oval } from "react-loader-spinner";
// import ThemeContext from '@/context/theme-context'
// import metamask from '/public/images/metamask.png'
// import wc from '/public/images/wc.svg'
// import Image from 'next/image'
// import { Connector } from 'wagmi'

// type LoginMethodModalProps = {
//   close(val: boolean): void
//   address: string | undefined
//   connectors: any[]
//   connect: (options: { connector: any }) => Promise<void>
//   disconnect: () => Promise<void>
// }

// const LoginMethodModal = ({
//   close,
//   address,
//   connectors,
//   connect,
//   disconnect,
// }: LoginMethodModalProps): JSX.Element => {
//   const { t } = useTranslation()
//   const themeCtx = React.useContext(ThemeContext)
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [isAuthenticating, setIsAuthenticating] = useState(false)
//   const [walletChosen, setWalletChosen] = useState('')

//   const loginMetamask = async () => {
//     setIsAuthenticating(true)
//     setWalletChosen('Metamask')
//     // 메타마스크 연결
//     const connector = connectors.find((conn) => conn.name === 'MetaMask')
//     if (connector) {
//       await connect({ connector })
//       setIsAuthenticated(true)
//     }
//     setIsAuthenticating(false)
//   }

//   // const loginWC = async () => {
//   //   setIsAuthenticating(true)
//   //   setWalletChosen('WalletConnect')
//   // }

//   return (
//     <>
//       <div
//         className="absolute w-screen h-screen bg-gray-500 z-40 opacity-30"
//         onClick={() => close(false)}
//       ></div>
//       <div
//         className={
//           themeCtx.isLight ? styles.lightContainer : styles.darkContainer
//         }
//       >
//         <div className="h-10 w-full flex flex-row justify-between items-center px-5">
//           <span className="font-semibold text-lg">Choose Login Method</span>
//           <XIcon
//             className="h-6 w-6 cursor-pointer"
//             onClick={() => close(false)}
//           />
//         </div>

//         {/* Login choices */}
//         {!isAuthenticating && !isAuthenticated && (
//           <div className="flex-1 rounded-2xl p-2 flex flex-col justify-between">
//             <div
//               className={`w-full h-[73px] flex justify-between items-center py-2 px-4 rounded-2xl ${
//                 themeCtx.isLight ? 'bg-gray-100' : 'bg-blue-800'
//               } cursor-pointer`}
//               onClick={loginMetamask}
//             >
//               <span>Metamask</span>
//               <Image src={metamask} alt="metamask" className="h-8 w-8" />
//             </div>

//             {/* <div
//               className={`w-full h-[73px] flex justify-between items-center py-2 px-4 rounded-2xl ${
//                 themeCtx.isLight ? 'bg-gray-100' : 'bg-blue-800'
//               } cursor-pointer`}
//               onClick={loginWC}
//             >
//               <span>WalletConnect</span>
//               <Image src={wc} alt="wallet connect" className="h-8 w-8" />
//             </div> */}
//           </div>
//         )}

//         {/* Authenticating */}
//         {isAuthenticating && (
//           <div className="flex flex-1 justify-center items-center">
//             <div className="flex flex-col justify-center items-center">
//               {/* <Oval ariaLabel="loading-indicator" height={50} width={50} strokeWidth={5} color="black" secondaryColor="grey" /> */}
//               <span>Authenticating...</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   )
// }

// export default LoginMethodModal

// const styles = {
//   lightContainer:
//     'absolute w-[350px] h-[260px] bottom-0 left-0 top-0 right-0 m-auto bg-white rounded-t-2xl z-40 py-5 flex flex-col md:w-[450px] md:h-[220px] md:pb-2 rounded-xl md:py-2 md:pb-0',
//   darkContainer:
//     'absolute w-[350px] h-[260px] bottom-0 left-0 top-0 right-0 m-auto bg-blue-900 rounded-t-2xl z-40 py-5 flex flex-col md:w-[450px] md:h-[220px] md:pb-2 rounded-xl md:py-2 md:pb-0 text-gray-200',
// }
