import BigNumber from 'bignumber.js'

export const formatFloatAmount = (balance?: BigNumber.Value): string => {
  if (!balance) return ''

  const bigBalance = new BigNumber(balance)
  const floatBalance = bigBalance.div(100).toFixed(2, 1)

  return BigNumber(Number(floatBalance)).toString()
}
