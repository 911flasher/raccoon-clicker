import { type ChangeEventHandler, FC } from 'react'

import { useTranslation } from 'react-i18next'

import styles from './styles.module.scss'

interface Props {
  value: string
  onChangeValue: (value: string) => void
}

export const SearchInput: FC<Props> = ({ value, onChangeValue }) => {
  const { t } = useTranslation()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => onChangeValue(e.target.value)
  const handleClear = (): void => onChangeValue('')

  return (
    <div className={styles.container}>
      <input type='text' placeholder={t('Search')} className={styles.input} onChange={handleChange} value={value} />

      <button type='button' className={styles.button} onClick={handleClear}>
        <img
          src={value ? '/images/icons/close.svg' : '/images/icons/search.svg'}
          alt='search'
          draggable={false}
          className={styles.searchIcon}
        />
      </button>
    </div>
  )
}
