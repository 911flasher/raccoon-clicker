import { FC, useMemo } from 'react'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { Text } from 'core/components/text'

import { headerByPage } from './constants'
import styles from './styles.module.scss'

interface Props {
  name: keyof typeof headerByPage
}

export const SectionHeader: FC<Props> = ({ name }) => {
  const { t } = useTranslation()

  const headerData = useMemo(() => headerByPage[name], [name])

  if (!headerData) return null

  return (
    <motion.div
      transition={{ ease: 'easeOut', duration: 0.4 }}
      animate={{ scale: 1, opacity: 1 }}
      initial={{ scale: 0.96, opacity: 0.5 }}
      className={styles.container}
    >
      <img
        src={headerData.imageSrc}
        alt={t(headerData.titleKey as 'friends')}
        draggable={false}
        // width={146} height={135}
      />
      <Text as='h1' textStyle='h1'>
        {t(headerData.titleKey as 'friends')}
      </Text>
    </motion.div>
  )
}
