import { FC, useEffect } from 'react'

import { useWindowVirtualizer } from '@tanstack/react-virtual'
import { useTranslation } from 'react-i18next'

import { IceCreamLoader } from 'core/components/ice-cream-loader'
import { Text } from 'core/components/text'
import { useAppDispatch, useAppSelector } from 'core/store/hooks'

import styles from './styles.module.scss'
import { selectFriendsState } from '../../store'
import { getFriendsList } from '../../store/actions/friends-list'
import { FriendBlock } from '../friend-block'

export const FriendsList: FC = () => {
  const { friends, isFriendsLoading, hasNextPage } = useAppSelector(selectFriendsState)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const rowVirtualizer = useWindowVirtualizer({
    count: hasNextPage ? friends.length + 1 : friends.length,
    estimateSize: () => 88,
    overscan: 20,
  })

  const virtualRows = rowVirtualizer.getVirtualItems()

  useEffect(() => {
    const [lastItem] = virtualRows.reverse()

    if (!lastItem) return

    if (lastItem.index >= friends.length - 1 && hasNextPage && !isFriendsLoading) {
      void dispatch(getFriendsList())
    }
  }, [hasNextPage, isFriendsLoading, virtualRows, friends.length, dispatch])

  if (isFriendsLoading && !friends.length) {
    return (
      <div className={styles.loaderContainer}>
        <IceCreamLoader />
      </div>
    )
  }

  return (
    <>
      {friends.length > 0 && (
        <Text textStyle='h2' className={styles.title}>
          {t('Friends list')}
        </Text>
      )}

      <div className={styles.container}>
        <div style={{ height: rowVirtualizer.getTotalSize(), position: 'relative' }}>
          {virtualRows.map(({ index, size, start }) => {
            const element = friends[index]

            if (!element) return null

            return (
              <FriendBlock
                key={element.id}
                friend={element}
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
      </div>
    </>
  )
}
