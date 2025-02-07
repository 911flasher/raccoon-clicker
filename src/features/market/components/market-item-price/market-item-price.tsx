import { FC } from 'react'

import { Text } from 'core/components/text'

import styles from './styles.module.scss'

interface Props {
  price: number | string
  oldPrice?: number | string
}

export const MarketItemPrice: FC<Props> = ({ price, oldPrice }) => {
  return (
    <div className={styles.priceContainer}>
      <Text className={styles.price} textStyle='h3'>
        ${price}
      </Text>

      {!!oldPrice && (
        <Text textStyle='smallPrice' className={styles.discountPrice}>
          ${oldPrice}
        </Text>
      )}
    </div>
  )
}
