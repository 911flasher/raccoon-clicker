import { FC, useMemo } from 'react'

import clsx from 'clsx'

import { Text } from 'core/components/text'
import { useAppSelector } from 'core/store/hooks'

import { getConfigByGuild } from './constants'
import styles from './styles.module.scss'
import { Guild } from '../../constants'
import { selectGuildsState } from '../../store/selectors'

interface Props {
  guild: Guild
  className?: string
}

export const GuildLogo: FC<Props> = ({ className, guild }) => {
  const { guilds } = useAppSelector(selectGuildsState)

  const config = useMemo(() => getConfigByGuild(guild), [guild])
  const guildInfo = useMemo(() => guilds.find((g) => g.id === guild), [guilds, guild])

  const range = useMemo(() => {
    const start = guildInfo?.option?.startPosition
    const end = guildInfo?.option?.endPosition

    if (!start) return `<${end}`

    if (!end) return `>${start}`

    return `<${end}`
  }, [guildInfo])

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.logoContainer}>
        <img src={config.image} alt={config.name} draggable={false}/>

        <div className={styles.bandContainer}>
          <img className={styles.priceIcon} src='/images/icons/coin.svg' alt='coin' draggable={false}/>
          <Text className={styles.price}>{range}</Text>
        </div>
      </div>

      <Text className={styles.name}>{config.name}</Text>
    </div>
  )
}
