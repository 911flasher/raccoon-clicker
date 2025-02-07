import { FC, useEffect } from 'react'

import { useWindowVirtualizer } from '@tanstack/react-virtual'

import { IceCreamLoader } from 'core/components/ice-cream-loader'
import { useAppDispatch, useAppSelector } from 'core/store/hooks'

import styles from './styles.module.scss'
import { selectLeadersState } from '../../store'
import { initLeadersState } from '../../store/actions/init'
import { InviteFriendsButton } from '../invite-friends-button'
import { LeaderBlock } from '../leader-block'

export const LeadersList: FC = () => {
  const { leaders, isLeadersLoaded } = useAppSelector(selectLeadersState)

  const dispatch = useAppDispatch()

  const rowVirtualizer = useWindowVirtualizer({
    count: leaders.length,
    estimateSize: () => 88,
    overscan: 20,
  })

  const virtualRows = rowVirtualizer.getVirtualItems()

  useEffect(() => {
    void dispatch(initLeadersState())
  }, [dispatch])

  if (!isLeadersLoaded) {
    return (
      <div className={styles.loaderContainer}>
        <IceCreamLoader />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div style={{ height: rowVirtualizer.getTotalSize(), position: 'relative' }}>
        {virtualRows.map(({ index, size, start }) => {
          const element = leaders[index]

          if (!element) return null

          return (
            <LeaderBlock
              key={element.id}
              leader={element}
              isAnimated
              style={{
                height: `${size - 8}px`,
                marginBottom: 8,
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                transform: `translateY(${start}px)`,
              }}
            />
          )
        })}
      </div>

      <InviteFriendsButton />
    </div>
  )
}
