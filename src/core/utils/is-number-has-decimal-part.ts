import BigNumber from 'bignumber.js'

export const isNumberHasDecimalPart = (number: BigNumber.Value): boolean => {
  return BigNumber(number).mod(1).gt(0)
}
