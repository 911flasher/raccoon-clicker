import { FC } from 'react'

import clsx from 'clsx'

import { Text } from 'core/components/text'
import type { TextProps } from 'core/components/text'
import { formatNumber } from 'core/utils/format-number'
import { BalanceType } from 'features/settings'

import { coinIcons } from './constants'
import styles from './styles.module.scss'

interface Props extends TextProps {
  price: string
  type?: BalanceType
  iconSize?: number
  iconMarginRight?: number
}

export const Price: FC<Props> = ({
  price,
  iconSize,
  className,
  iconMarginRight,
  type = BalanceType.Donuts,
  ...props
}) => (
  <Text className={clsx(styles.price, className)} textStyle='number' {...props}>
    <img
      className={styles.priceIcon}
      style={{ width: iconSize || 16, marginRight: iconMarginRight || 4 }}
      src={coinIcons[type].icon}
      alt={coinIcons[type].alt}
      draggable="false"
    />
    {formatNumber(price)}
  </Text>
)
