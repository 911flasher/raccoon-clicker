import { i18next } from 'features/localization'

export enum BoostType {
  EnergyRecoverySpeed = 'energy_recovery_speed',
  MaxEnergy = 'max_energy',
  PassiveShooting = 'passive_shooting',
}

export const getBoostTitleKeys = (boost: BoostType): string => {
  const titles = {
    [BoostType.MaxEnergy]: i18next.t('Maximum energy'),
    [BoostType.EnergyRecoverySpeed]: i18next.t('Fast recovery'),
    [BoostType.PassiveShooting]: i18next.t('Passive clicking'),
  }

  return titles[boost]
}

export const getBoostDescriptionKeys = (boost: BoostType): string => {
  const descriptions = {
    [BoostType.MaxEnergy]: i18next.t('Click more - gain more'),
    [BoostType.EnergyRecoverySpeed]: i18next.t('Boost energy recovery speed'),
    [BoostType.PassiveShooting]: i18next.t('While you were gone, you have earned'),
  }

  return descriptions[boost]
}
