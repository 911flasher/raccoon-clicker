export const trimString = (str: string, maxLen: number): string => {
  if (str.length > maxLen) {
    return str.slice(0, maxLen).concat('...')
  }

  return str
}
