import { FC, useRef, useState } from 'react'

import { initInvoice } from '@telegram-apps/sdk'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { Button } from 'core/components/button'
import { Text } from 'core/components/text'
import { useOnClickOutside } from 'core/hooks/use-click-outside'
import { useAppDispatch } from 'core/store/hooks'

import styles from './styles.module.scss'
import { buyPack, getPackRewards } from '../../store/actions/packs'
import type { PackItemInfo } from '../../types'
import { MarketItemPrice } from '../market-item-price'

interface Props {
  item: PackItemInfo
  onClose: () => void
}

export const PackItemDetail: FC<Props> = ({ item, onClose }) => {
  const [isLoading, setIsLoading] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  useOnClickOutside(modalRef, onClose)

  const handleBuy = async (): Promise<void> => {
    setIsLoading(true)

    try {
      const invoiceUrl = await dispatch(buyPack(item.id)).unwrap()
      const invoice = initInvoice()

      const status = await invoice.open(invoiceUrl, 'url')

      if (status === 'paid') {
        await dispatch(getPackRewards(item.id)).unwrap()
        onClose()
      }
    } catch (e) {
      toast.error(t('Something went wrong'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div ref={modalRef} className={styles.modal}>
        <button type='button' className={styles.closeButton} onClick={onClose}>
          <img src='/images/icons/close.svg' alt='close button' draggable={false}/>
        </button>

        <div className={styles.imageContainer}>
          <img className={styles.itemImage} src={item.imageUrl} alt={item.name} draggable={false}/>
        </div>

        <Text textStyle='h2' className={styles.name}>
          {item.name}
        </Text>

        <MarketItemPrice price={item.amountUsd} />

        {/* <div className={styles.price}>
          <img src='/images/packs/tg-stars.png' alt='tg stars' />
          <Text textStyle='h2'>{item.currencies[0].value}</Text>
        </div> */}

        <Text className={styles.description}>{item.description}</Text>

        <Button onClick={handleBuy} disabled={isLoading}>
          <Text textStyle='button'>{isLoading ? t('Loading...') : t('BUY')}</Text>
        </Button>
      </div>
    </div>
  )
}
