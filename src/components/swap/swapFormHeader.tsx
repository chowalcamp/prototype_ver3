// prototype_v3/src/app/swap/SwapFormHeader.tsx
'use client' // 클라이언트 컴포넌트로 지정

import { usePathname } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

const SwapFormHeader = (): JSX.Element => {
  const { t } = useTranslation()
  const pathname = usePathname()

  return (
    <div className="w-full flex justify-between rounded-3xl p-2 text-neutral-50 mb-3 text-2xl">
      {pathname === '/' && <span className="font-semibold">{t('Swap')}</span>}
      {pathname === '/liquidity' && (
        <span className="font-semibold">{t('Liquidity pool')}</span>
      )}
    </div>
  )
}

export default SwapFormHeader
