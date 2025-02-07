import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { Text } from 'core/components/text'

import styles from './styles.module.scss'

interface Props {
  title: string
}

export const GoBack: FC<Props> = ({ title }) => {
  const navigate = useNavigate()

  const handleGoBack = (): void => navigate(-1)

  return (
    <div className={styles.container}>
      <button type='button' onClick={handleGoBack} className={styles.menuButton}>
        <img src='/images/icons/back-button.svg' alt='go-back' draggable={false}/>

        <Text textStyle='bodyText'>{title}</Text>
      </button>
    </div>
  )
}
