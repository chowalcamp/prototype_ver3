// prototype_v3/src/app/swap/SwapFormHeader.tsx
'use client' // 클라이언트 컴포넌트로 지정

import React from 'react'
import { useTranslation } from 'react-i18next'

const SwapFormHeader = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <div className="w-full flex justify-between rounded-3xl p-2 text-neutral-50 mb-3">
      <span className="font-semibold">{t('swap')}</span>
    </div>
  )
}

export default SwapFormHeader
