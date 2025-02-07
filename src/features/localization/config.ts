import type { InitOptions } from 'i18next'

import { English, Russian, Spanish } from './locales'
import { Language } from './types/language'

const resources = {
  [Language.English]: {
    translation: English,
  },
  [Language.Russian]: {
    translation: Russian,
  },
  [Language.Spanish]: {
    translation: Spanish,
  },
}

export const i18nextConfig: InitOptions = {
  resources,
  fallbackLng: Language.English,
  supportedLngs: [Language.English, Language.Russian, Language.Spanish],
  defaultNS: 'translation',
  debug: false,
}
