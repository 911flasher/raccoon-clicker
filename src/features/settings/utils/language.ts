const storageKey = 'language'

export const setLanguage = (language: string): void => {
  localStorage.setItem(storageKey, language)
}

export const getLanguage = (): string => {
  return localStorage.getItem(storageKey) || 'en'
}
