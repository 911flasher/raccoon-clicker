import { FC, useEffect } from 'react'

import { IceCreamLoader } from 'core/components/ice-cream-loader'
import { useAppDispatch, useAppSelector } from 'core/store/hooks'

import styles from './styles.module.scss'
import { selectBoostsState } from '../../store'
import { getBoostsList } from '../../store/actions/boosts-list'
import { BoostBlock } from '../boost-block'

export const BoostList: FC = () => {
  const { isBoostsLoaded, boosts } = useAppSelector(selectBoostsState)

  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(getBoostsList())
  }, [dispatch])

  if (!isBoostsLoaded) {
    return (
      <div className={styles.loaderContainer}>
        <IceCreamLoader />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {boosts.map((boost) => (
        <BoostBlock key={boost.id} boost={boost} />
      ))}
    </div>
  )
}
