import { useState, type FC } from 'react'

import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { Text } from 'core/components/text'
import { useAppSelector } from 'core/store/hooks'
import { Guild, GuildLeaders, GuildsSlider, selectGuildsState } from 'features/guilds'
import { GoBack, Header } from 'features/page-layout'

import styles from './styles.module.scss'

export const GuildsPage: FC = () => {
  const { currentGuild } = useAppSelector(selectGuildsState)
  const [selectedGuild, setSelectedGuild] = useState<Guild>(currentGuild)

  const { t } = useTranslation()

  const handleSelectGuild = (guild: Guild): void => setSelectedGuild(guild)

  return (
    <div className={styles.container}>
      <div className={clsx(styles.innerContainer, styles.topContainer)}>
        <Header />

        <GoBack title={t('Guilds')} />

        <div className={styles.title}>
          <Text as='h2' textStyle='h2'>
            {t('Grade')}
          </Text>
          <Text>{t('Top up balance to get a higher grade. The higher the grade the better the opportunities!')}</Text>
        </div>
      </div>

      <GuildsSlider onSelectGuild={handleSelectGuild} />

      <div className={clsx(styles.innerContainer, styles.bottomContainer)}>
        <GuildLeaders selectedGuild={selectedGuild} />
      </div>
    </div>
  )
}
