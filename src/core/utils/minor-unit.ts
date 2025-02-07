import BigNumber from 'bignumber.js'

// 0.00001 -> 1
export const toMinorUnit = (amount: BigNumber.Value, decimals: number): BigNumber => {
  if (!amount) return BigNumber(0)

  if (!decimals) return BigNumber(amount)

  return new BigNumber(amount).multipliedBy(`1e${decimals}`)
}

// 1 -> 0.00001
export const fromMinorUnit = (amount: BigNumber.Value, decimals: number): BigNumber => {
  if (!amount) return BigNumber(0)

  if (!decimals) return BigNumber(amount)

  return new BigNumber(amount).multipliedBy(`1e-${decimals}`)
}
