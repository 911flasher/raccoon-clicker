import BigNumber from 'bignumber.js'

export const deleteDecimalPart = (amount?: BigNumber.Value): string => {
  if (!amount) return ''

  const bigBalance = new BigNumber(amount)

  return bigBalance.toFixed(0, 1)
}
