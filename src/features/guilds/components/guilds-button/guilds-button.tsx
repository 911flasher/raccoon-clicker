import { FC } from 'react'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Text } from 'core/components/text'

import guildsImg from './assets/guilds.svg'
import styles from './styles.module.scss'

interface Props {}

export const GuildsButton: FC<Props> = () => {
  const { t } = useTranslation()

  return (
    <Link to='/guilds' className={styles.container}>
      <div>
        <Text>{t('Guilds')}</Text>

        <img src={guildsImg} alt='guilds' draggable={false}/>
      </div>
    </Link>
  )
}
