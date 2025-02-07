import { FC } from 'react'

import clsx from 'clsx'

import styles from './styles.module.scss'
import { BoostType } from '../../constants'

interface Props {
  boostId: BoostType
  boostName: string
  containerClassName?: string
  isSmall?: boolean
}

const icons = {
  [BoostType.MaxEnergy]: {
    full: 'images/boosts/max-energy-full.svg',
    small: 'images/boosts/max-energy-small.svg',
  },
  [BoostType.EnergyRecoverySpeed]: {
    full: 'images/boosts/fast-recovery-full.svg',
    small: 'images/boosts/fast-recovery-small.svg',
  },
  [BoostType.PassiveShooting]: {
    full: 'images/boosts/passive-shots-full.svg',
    small: 'images/boosts/passive-shots-small.svg',
  },
}

export const BoostIcon: FC<Props> = ({ boostId, boostName, containerClassName, isSmall }) => {
  const icon = icons[boostId]

  return (
    <img
      src={isSmall ? icon.small : icon.full}
      alt={boostName}
      draggable="false"
      className={clsx(
        {
          [styles.icon]: !isSmall,
          [styles.smallIcon]: isSmall,
        },
        containerClassName,
      )}
    />
  )
}
