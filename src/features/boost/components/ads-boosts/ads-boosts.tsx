import { FC, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Portal } from 'core/components/portal'
import { Text } from 'core/components/text'
import { useAppSelector } from 'core/store/hooks'

import styles from './styles.module.scss'
import { getBoostTitleKeys } from '../../constants'
import { selectBoostsState } from '../../store'
import type { Boost } from '../../types'
import { BoostIcon } from '../boost-icon'
import { BuyBoostBottomSheet } from '../buy-boost-bottom-sheet'

export const AdsBoosts: FC = () => {
  const { boosts } = useAppSelector(selectBoostsState)

  const [selectedBoost, setSelectedBoost] = useState<Boost>(boosts[0])
  const [isOpened, setIsOpened] = useState(false)

  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleSelectBoost = (boost: Boost) => () => {
    setSelectedBoost(boost)
    setIsOpened(true)
  }

  const handleClose = (): void => setIsOpened(false)
  const handleGoMarket = (): void => navigate('/market')
  const handleGoPresale = (): void => navigate('/presale')

  return (
    <>
      <div className={styles.container}>
        <div className={styles.row}>
          {boosts.map((boost) => (
            <button key={boost.id} type='button' className={styles.topButton} onClick={handleSelectBoost(boost)}>
              <div>
                <BoostIcon boostId={boost.id} boostName={getBoostTitleKeys(boost.id)} isSmall />
                <Text as='span' textStyle='menuText'>
                  +{boost.currentLevel + 1}
                </Text>
              </div>

              <Text textStyle='menuText'>{getBoostTitleKeys(boost.id)}</Text>
            </button>
          ))}
        </div>

        <div className={styles.row}>
          <button type='button' className={styles.bottomButton} onClick={handleGoMarket}>
            <Text textStyle='h3'>{t('R-shop')}</Text>
          </button>

          <button type='button' className={styles.bottomButton} onClick={handleGoPresale}>
            <Text textStyle='h3'>{t('Sale is live')}</Text>
          </button>
        </div>
      </div>

      <Portal>
        <BuyBoostBottomSheet boost={selectedBoost} isOpened={isOpened} onClose={handleClose} />
      </Portal>
    </>
  )
}
