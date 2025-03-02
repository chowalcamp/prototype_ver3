// prototype_v3/src/app/components/NavBar/MoreOptionsDropDown.tsx
'use client' // 클라이언트 컴포넌트로 지정

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  GlobeIcon,
  MoonIcon,
  SunIcon,
  ChevronLeftIcon,
  CheckIcon,
} from '@heroicons/react/outline'
import { LanguageType } from '@/types'
import ThemeContext from '@/context/theme-context'

type MoreOptionsDropDownProps = {
  showOptions(val: boolean): void
}

const MoreOptionsDropDown = ({
  showOptions,
}: MoreOptionsDropDownProps): JSX.Element => {
  const { t } = useTranslation()
  const [changeLanguage, setChangeLanguage] = React.useState(false)
  const [isSelected, setIsSelected] = useState<LanguageType>('en')
  const { isLight, changeTheme } = React.useContext(ThemeContext)

  const selectLanguage = (lng: string) => {
    setIsSelected(lng as LanguageType)
    // t.changeLanguage(lng)
  }

  return (
    <span
      className="bg-white min-w-[180px] h-20 rounded-lg absolute right-3 top-20 shadow-md p-3 flex flex-col justify-between z-10"
      onMouseLeave={() => showOptions(false)}
    >
      {changeLanguage === false && (
        <>
          <button
            className="w-full text-gray-400 flex justify-between text-sm cursor-pointer"
            onClick={() => setChangeLanguage(true)}
          >
            <span className="select-none">Language</span>
            <GlobeIcon className="h-4 w-4" />
          </button>
          {isLight && (
            <button
              className="w-full text-gray-400 flex justify-between text-sm cursor-pointer"
              onClick={changeTheme}
            >
              <span className="select-none">Dark</span>
              <MoonIcon className="h-4 w-4" />
            </button>
          )}
          {!isLight && (
            <button
              className="w-full text-gray-400 flex justify-between text-sm cursor-pointer"
              onClick={changeTheme}
            >
              <span className="select-none">Light</span>
              <SunIcon className="h-5 w-5" />
            </button>
          )}
        </>
      )}
      {changeLanguage === true && (
        <span className="h-full flex flex-col justify-between">
          <button
            className="w-full text-gray-400 flex justify-between text-sm mb-1 outline-none cursor-pointer"
            onClick={() => setChangeLanguage(false)}
          >
            <ChevronLeftIcon className="h-3 w-3" />
          </button>
          <button
            className="w-full text-gray-400 flex justify-between text-sm outline-none cursor-pointer"
            onClick={() => selectLanguage('en')}
          >
            <span className="select-none">English</span>
            {/* {isSelected === 'en' && <CheckIcon className="h-3 w-3" />} */}
          </button>
          <button
            className="w-full text-gray-400 flex justify-between text-sm outline-none cursor-pointer"
            onClick={() => selectLanguage('es')}
          >
            <span className="select-none">Spanish</span>
            {/* {isSelected === 'es' && <CheckIcon className="h-3 w-3" />} */}
          </button>
        </span>
      )}
    </span>
  )
}

export default MoreOptionsDropDown
