export const formatNumber = (n: string | number): string => {
  const num = Number(n)

  if (Number.isNaN(num)) return '0'

  return Intl.NumberFormat('ru-RU').format(num)
}
