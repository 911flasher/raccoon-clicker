import BigNumber from 'bignumber.js'

const goalString = '2346208'
export const goal = BigNumber(goalString).toString()

export const formatAmount = (value: number | string): string => {
  const fmt = {
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
  }

  return BigNumber(value).toFormat(0, 0, fmt)
}
