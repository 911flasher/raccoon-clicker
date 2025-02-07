import { FC, useRef } from 'react'

import { useTranslation } from 'react-i18next'

import { Button } from 'core/components/button'
import { Text } from 'core/components/text'
import { useOnClickOutside } from 'core/hooks/use-click-outside'
import { MarketItemPrice } from 'features/market/components/market-item-price'

import type { MarketItemInfo } from '../../types'
import styles from './styles.module.scss'

interface Props {
  item: MarketItemInfo
  onClose: () => void
}

export const MarketItemDetail: FC<Props> = ({ item, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const { t } = useTranslation()

  useOnClickOutside(modalRef, onClose)

  return (
    <div className={styles.container}>
      <div ref={modalRef} className={styles.modal}>
        <button type='button' className={styles.closeButton} onClick={onClose}>
          <img src='/images/icons/close.svg' alt='close button' draggable={false}/>
        </button>

        <div className={styles.imageContainer}>
          <img className={styles.itemImage} src={item.image.url} alt={item.image.alt} />

          {!!item.oldPrice && <img className={styles.salesBadge} src='/images/market/sale.png' alt='sale' draggable={false} />}
        </div>

        <Text textStyle='h2'>{item.name}</Text>
        <MarketItemPrice price={item.price} oldPrice={item.oldPrice} />

        <Text className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab beatae corporis, doloribus facilis iure magni
          necessitatibus perferendis tenetur vel veniam.π
        </Text>

        <Button>
          <Text textStyle='button'>{t('buy on amazon')}</Text>
        </Button>
      </div>
    </div>
  )
}
