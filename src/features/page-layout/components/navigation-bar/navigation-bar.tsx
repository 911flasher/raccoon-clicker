import { FC, useMemo } from 'react'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { Text } from 'core/components/text'

import { getLinks } from './constants'
import styles from './styles.module.scss'

export const NavigationBar: FC = () => {
  const links = useMemo(() => getLinks(), [])

  const { pathname } = useLocation()
  const { t } = useTranslation()

  const currentLink = links.find((link) => link.link === pathname)
  const currentIndex = currentLink ? links.indexOf(currentLink) : 0

  if (!currentLink) return null

  return (
    <div className={styles.container}>
      {links.map(({ link, titleKey, imageSrc }) => (
        <Link className={clsx(styles.link)} to={link} key={titleKey}>
          <img src={imageSrc} alt={titleKey} draggable={false}/>
          <Text textStyle='menuText'>{t(titleKey as 'clicker')}</Text>
        </Link>
      ))}

      <motion.div className={styles.slider} animate={{ top: 2, left: currentIndex * 60 + (currentIndex + 1) * 2 }} />
    </div>
  )
}
