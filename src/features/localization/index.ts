import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import { i18nextConfig } from './config'

void i18next.use(initReactI18next).init(i18nextConfig)

export { i18next }

export { LanguageSelector } from './components/language-selector'
export { Language } from './types/language'
