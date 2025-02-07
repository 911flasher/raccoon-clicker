import { FC, useState } from 'react'

import { Portal } from 'core/components/portal'
import { Text } from 'core/components/text'

import styles from './styles.module.scss'
import type { PackItemInfo } from '../../types'
import { PackItemDetail } from '../pack-item-detail'

interface Props {
  item: PackItemInfo
}

export const PackItem: FC<Props> = ({ item }) => {
  const [isOpened, setIsOpened] = useState(false)

  const handleOpen = (): void => setIsOpened(true)
  const handleClose = (): void => setIsOpened(false)

  return (
    <>
      <button type='button' onClick={handleOpen} className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={item.imageUrl} alt={item.name} draggable={false}/>
        </div>

        <Text className={styles.name}>{item.name}</Text>

        <div className={styles.price}>
          {/* <img src='/images/packs/tg-stars.png' alt='tg stars' /> */}
          <Text>${item.amountUsd}</Text>
        </div>
      </button>
      <Portal>{isOpened && <PackItemDetail item={item} onClose={handleClose} />}</Portal>
    </>
  )
}
