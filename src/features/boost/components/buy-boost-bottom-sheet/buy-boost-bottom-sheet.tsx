import { FC, useMemo, useState } from 'react'

import BigNumber from 'bignumber.js'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { BottomSheet } from 'core/components/bottom-sheet'
import { Button } from 'core/components/button'
import { Portal } from 'core/components/portal'
import { Price } from 'core/components/price'
import { Text } from 'core/components/text'
import { useAppDispatch, useAppSelector } from 'core/store/hooks'
import { BalanceType, selectSettingsState } from 'features/settings'

import styles from './styles.module.scss'
import { getBoostDescriptionKeys, getBoostTitleKeys } from '../../constants'
import { selectBoostsState } from '../../store'
import { buyBoost } from '../../store/actions/buy-boost'
import { Boost } from '../../types'
import { BoostIcon } from '../boost-icon'
import { NotEnoughMoney } from '../not-enough-money'

interface Props {
  boost: Boost
  isOpened: boolean
  onClose: () => void
}

export const BuyBoostBottomSheet: FC<Props> = ({ boost, isOpened, onClose }) => {
  const [isVisibleNotEnoughModal, setIsVisibleNotEnoughModal] = useState(false)

  const { beer } = useAppSelector(selectSettingsState)
  const { isBoostUpgrading } = useAppSelector(selectBoostsState)
  const isMaxLevel = boost.upgradeCost === '-1'

  const beerMinusAmount = useMemo(() => BigNumber(beer).minus(boost.upgradeCost), [beer, boost.upgradeCost])

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleClose = (): void => setIsVisibleNotEnoughModal(false)

  const handleBuyUpgrade = async (): Promise<void> => {
    try {
      if (beerMinusAmount.lt(0)) {
        setIsVisibleNotEnoughModal(true)

        return
      }

      await dispatch(buyBoost(boost)).unwrap()
      onClose()

      toast.success(
        t('{{name}} level is up to {{level}}', {
          level: BigNumber(boost.currentLevel).plus(1).toNumber(),
          name: getBoostTitleKeys(boost.id),
        }),
        {
          duration: 2000,
        },
      )
    } catch (e) {
      toast.error(t('Something went wrong'))
    }
  }

  return (
    <>
      <BottomSheet isOpened={isOpened} onClose={onClose}>
        <div className={styles.container}>
          <BoostIcon boostId={boost.id} boostName={getBoostTitleKeys(boost.id)} containerClassName={styles.icon} />
          <Text className={styles.title} textStyle='h2'>
            {getBoostTitleKeys(boost.id)}
          </Text>
          <Text className={styles.description}>
            {!isMaxLevel ? getBoostDescriptionKeys(boost.id) : t('You have achieved the highest level!')}
          </Text>

          {!isMaxLevel && (
            <>
              <Text className={styles.priceTitle}>{t('Price')}</Text>

              <Price
                className={styles.price}
                textStyle='h1'
                price={boost.upgradeCost}
                iconSize={32}
                iconMarginRight={8}
                type={BalanceType.Beer}
              />
            </>
          )}

          {isMaxLevel && (
            <>
              <Text className={styles.maxLevelContainer} textStyle='h1'>
                {t('Max level')}
              </Text>
              <Button className={styles.button} onClick={onClose}>
                {t('COOL')}
              </Button>
            </>
          )}

          {!isMaxLevel && (
            <Button className={styles.button} onClick={handleBuyUpgrade} disabled={isBoostUpgrading}>
              {isBoostUpgrading ? t('LOADING...') : t('BUY')}
            </Button>
          )}
        </div>
      </BottomSheet>

      <Portal>
        <NotEnoughMoney
          isVisible={isVisibleNotEnoughModal}
          amount={beerMinusAmount.abs().toNumber()}
          onClose={handleClose}
        />
      </Portal>
    </>
  )
}
