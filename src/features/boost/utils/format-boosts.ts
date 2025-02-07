import { formatFloatAmount } from 'core/utils/format-balance'
import { getMaxValueFromArray } from 'core/utils/get-max-value-from-array'

import { BoostType } from '../constants'
import type { Boost, BoostInfo } from '../types'

interface FormatBoostsArgs {
  boostsInfo: Record<BoostType, BoostInfo[]>
  userBoosts: Record<BoostType, Record<string, number>>
}

export const formatBoosts = ({ boostsInfo, userBoosts }: FormatBoostsArgs): Boost[] => {
  const sortedBoostsInfo = [BoostType.EnergyRecoverySpeed, BoostType.MaxEnergy, BoostType.PassiveShooting].reduce(
    (acc, boostType) => {
      const boost = boostsInfo[boostType]
      const levels = Object.values(boost)
      const objLevels = levels.reduce((a, i) => ({ ...a, [i.level]: i }), {})

      return { ...acc, [boostType]: objLevels }
    },
    {} as Record<BoostType, Record<string, BoostInfo>>,
  )

  return [BoostType.EnergyRecoverySpeed, BoostType.MaxEnergy, BoostType.PassiveShooting].map((boostType) => {
    const list = sortedBoostsInfo?.[boostType] || {}
    const userInfo = userBoosts?.[boostType] || {}
    const currentLevel = getMaxValueFromArray(Object.keys(userInfo))
    const maxLevel = getMaxValueFromArray(Object.keys(list))
    const currentBoostInfo = list?.[currentLevel]
    const upgradeCost = currentLevel !== maxLevel ? String(list[currentLevel + 1].cost) : '-1'

    return {
      currentLevel,
      maxLevel,
      upgradeCost,
      id: boostType,
      effect: formatFloatAmount(currentBoostInfo?.effect || 1000),
    }
  })
}
