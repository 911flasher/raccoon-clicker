import type { FC } from 'react'

import { useTranslation } from 'react-i18next'

import { BaseBlock } from 'core/components/base-block'
import { Text } from 'core/components/text'
import { GoBack } from 'features/page-layout'

import styles from './styles.module.scss'

export const PartnersPage: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <GoBack title={t('Partners projects')} />

      <div className={styles.container}>
        <BaseBlock className={styles.block}>
          <img className={styles.logo} src='/images/partners/pepe.png' draggable={false} alt='pepe' />
          <Text>Pepe</Text>
        </BaseBlock>

        <BaseBlock className={styles.block}>
          <img className={styles.logo} src='/images/partners/shiba.png' draggable={false} alt='shiba' />
          <Text>Shiba inu</Text>
        </BaseBlock>

        <BaseBlock className={styles.block}>
          <img className={styles.logo} src='/images/partners/doge.png' draggable={false} alt='doge' />
          <Text>Dogecoin</Text>
        </BaseBlock>

        <BaseBlock className={styles.block}>
          <img className={styles.logo} src='/images/partners/wif.png' draggable={false} alt='wif' />
          <Text>dogwifhat</Text>
        </BaseBlock>

        <BaseBlock className={styles.block}>
          <img className={styles.logo} src='/images/partners/bonk.png' draggable={false} alt='bonk' />
          <Text>Bonk</Text>
        </BaseBlock>

        <BaseBlock className={styles.block}>
          <img className={styles.logo} src='/images/partners/brett.png' draggable={false} alt='brett' />
          <Text>Brett</Text>
        </BaseBlock>

        <BaseBlock className={styles.block}>
          <img className={styles.logo} src='/images/partners/book-of-meme.png' draggable={false} alt='BOOK OF MEME' />
          <Text>BOOK OF MEME</Text>
        </BaseBlock>
      </div>
    </>
  )
}
