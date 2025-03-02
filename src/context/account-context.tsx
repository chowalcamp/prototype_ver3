'use client'

import { createContext, useContext } from "react"
import { useAccount, useDisconnect } from "wagmi"

const AccountContext = createContext({
  isConnected: false,
  address: '' as `0x${string}` | undefined,
})

export const AccountProvider = ({ children }: { children: React.ReactNode }) => {
  const { isConnected, address } = useAccount()

  return (
    <AccountContext.Provider value={{ isConnected, address }}>
      {children}
    </AccountContext.Provider>
  )
}

export const useAccountContext = () => useContext(AccountContext)

export const useConnectProvider = () => {
  const { isConnected, address } = useAccountContext()
  return { isConnected, address }
}

export const useDisconnectProvider = () => {
  const { disconnect } = useDisconnect()
  return disconnect
}


