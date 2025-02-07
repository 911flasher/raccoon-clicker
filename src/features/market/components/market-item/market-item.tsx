import { FC, useState } from 'react'

import { Portal } from 'core/components/portal'
import { Text } from 'core/components/text'

import styles from './styles.module.scss'
import type { MarketItemInfo } from '../../types'
import { MarketItemDetail } from '../market-item-detail'
import { MarketItemPrice } from '../market-item-price'

interface Props {
  item: MarketItemInfo
}

export const MarketItem: FC<Props> = ({ item }) => {
  const [isOpened, setIsOpened] = useState(false)

  const handleOpen = (): void => setIsOpened(true)
  const handleClose = (): void => setIsOpened(false)

  return (
    <>
      <button type='button' onClick={handleOpen} className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={item.image.url} alt={item.image.alt} draggable={false}/>
        </div>

        <Text className={styles.name}>{item.shortName}</Text>

        <MarketItemPrice price={item.price} oldPrice={item.oldPrice} />
      </button>

      <Portal>{isOpened && <MarketItemDetail item={item} onClose={handleClose} />}</Portal>
    </>
  )
}
