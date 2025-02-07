import { FC, PropsWithChildren, useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import { getLanguage } from '../../utils/language'

export const SettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { i18n } = useTranslation()

  useEffect(() => {
    const previousLanguage = getLanguage()

    if (previousLanguage !== i18n.language) {
      void i18n.changeLanguage(previousLanguage)
    }
  }, [i18n])

  return children
}
