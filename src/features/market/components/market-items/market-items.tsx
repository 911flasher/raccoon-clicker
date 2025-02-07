import { FC, useEffect, useMemo, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { Text } from 'core/components/text'
import { useAppDispatch, useAppSelector } from 'core/store/hooks'

import { selectMarketState } from '../../store'
import { initMarketState } from '../../store/actions/init'
import { MarketItem } from '../market-item'
import { MarketSwitch } from '../market-switch'
import { PackItem } from '../pack-item'
import { SearchInput } from '../search-input'
import styles from './styles.module.scss'

export const MarketItems: FC = () => {
  const [isMerch, setIsMerch] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const { merchItems, electronicItems, packs } = useAppSelector(selectMarketState)
  const marketItems = useMemo(() => {
    const items = isMerch ? merchItems : electronicItems

    if (items && searchValue) {
      const lowerCaseValue = searchValue.toLowerCase()

      return items.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerCaseValue) ||
          item.shortName.toLowerCase().includes(lowerCaseValue) ||
          item.brand?.toLowerCase()?.includes(lowerCaseValue),
      )
    }

    return items
  }, [isMerch, merchItems, electronicItems, searchValue])

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  useEffect(() => {
    void dispatch(initMarketState())

  }, [dispatch])

  return (
    <div>
      <SearchInput value={searchValue} onChangeValue={setSearchValue} />

      <div className={styles.resultsAndSwitch}>
        <Text className={styles.results} textStyle='number'>
          {t('Found {{count}} results', { count: isMerch ? marketItems.length : marketItems.length + packs.length })}
        </Text>

        <MarketSwitch isMerch={isMerch} onChooseIsMerch={setIsMerch} />
      </div>

      <div className={styles.grid}>
        {!isMerch && packs.map((item) => <PackItem key={item.id} item={item} />)}

        {marketItems.map((item) => (
          <MarketItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
