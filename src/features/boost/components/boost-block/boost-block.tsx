import { FC, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { BaseBlock } from 'core/components/base-block'
import { Price } from 'core/components/price'
import { Text } from 'core/components/text'
import { BalanceType } from 'features/settings'

import styles from './styles.module.scss'
import { getBoostTitleKeys } from '../../constants'
import { Boost } from '../../types'
import { BoostIcon } from '../boost-icon'
import { BuyBoostBottomSheet } from '../buy-boost-bottom-sheet'

interface Props {
  boost: Boost
}

export const BoostBlock: FC<Props> = ({ boost }) => {
  const [isOpened, setIsOpened] = useState(false)

  const { t } = useTranslation()

  const handleOpen = (): void => setIsOpened(true)
  const handleClose = (): void => setIsOpened(false)

  return (
    <>
      <BaseBlock className={styles.container} onClick={handleOpen} isAnimated>
        <BoostIcon boostId={boost.id} boostName={getBoostTitleKeys(boost.id)} containerClassName={styles.icon} />

        <div>
          <Text>{t(getBoostTitleKeys(boost.id))}</Text>
          {boost.upgradeCost !== '-1' && <Price price={boost.upgradeCost} type={BalanceType.Beer} />}
        </div>

        <Text textStyle='number' className={styles.level}>
          {t('Level')} {boost.currentLevel === boost.maxLevel ? boost.maxLevel + 1 : boost.currentLevel + 1}
        </Text>
      </BaseBlock>

      <BuyBoostBottomSheet boost={boost} isOpened={isOpened} onClose={handleClose} />
    </>
  )
}
