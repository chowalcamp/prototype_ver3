'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, WagmiProvider, createConfig } from 'wagmi'
import { mainnet, polygon, bsc } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

export function WagmiContext({ children }: { children: React.ReactNode }) {
  const config = createConfig({
    ssr: true, // Make sure to enable this for server-side rendering (SSR) applications.
    chains: [mainnet, polygon, bsc], // Ethereum, Polygon, BSC 지원
    connectors: [metaMask()],
    transports: {
      [mainnet.id]: http(),
      [polygon.id]: http(),
      [bsc.id]: http(),
    },
  })
  const client = new QueryClient()
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
