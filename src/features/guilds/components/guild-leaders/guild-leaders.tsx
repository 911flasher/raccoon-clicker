import { FC } from 'react'

import { useTranslation } from 'react-i18next'

import { IceCreamLoader } from 'core/components/ice-cream-loader'
import { Text } from 'core/components/text'
import { useAppSelector } from 'core/store/hooks'
import { LeaderBlock } from 'features/leaders'

import styles from './styles.module.scss'
import { Guild } from '../../constants'
import { selectGuildLeaders, selectIsLoadedLeaders, selectIsLoadingLeaders } from '../../store/selectors'

interface Props {
  selectedGuild: Guild
}

export const GuildLeaders: FC<Props> = ({ selectedGuild }) => {
  const selectList = useAppSelector(selectGuildLeaders)
  const selectIsLoading = useAppSelector(selectIsLoadingLeaders)
  const selectIsLoaded = useAppSelector(selectIsLoadedLeaders)

  const leaders = selectList(selectedGuild)
  const isLoading = selectIsLoading(selectedGuild)
  const isLoaded = selectIsLoaded(selectedGuild)

  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <IceCreamLoader />
      </div>
    )
  }

  if (isLoaded && leaders.length === 0) {
    return (
      <Text className={styles.noLeaders} textStyle='h4'>
        {t('No leaders in this guild yet')}
      </Text>
    )
  }

  return (
    <div className={styles.container}>
      {leaders.map((leader) => (
        <LeaderBlock
          key={leader.id}
          leader={{
            id: leader.id,
            name: leader.name,
            place: leader.place,
            points: leader.points,
            avatar: leader.avatar,
          }}
        />
      ))}
    </div>
  )
}
