export const getMaxValueFromArray = (arr: string[]): number => {
  if (arr && arr.length) {
    const numArr = arr.map((elem) => Number(elem))

    return Math.max(...numArr)
  }

  return 0
}
