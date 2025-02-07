export const numberWithinRange = (number: number, min: number, max: number): number => {
  return Math.min(Math.max(number, min), max)
}
