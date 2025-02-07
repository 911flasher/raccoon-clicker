import { FC, useCallback, useMemo, useRef, useState } from 'react'

import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { Text } from 'core/components/text'
import { useOnClickOutside } from 'core/hooks/use-click-outside'
import { useDebounce } from 'core/hooks/use-debounce'
import { noop } from 'core/utils/noop'
import { setLanguage } from 'features/settings/utils/language'

import styles from './styles.module.scss'
import { Language } from '../../types/language'

interface Props {}

export const LanguageSelector: FC<Props> = () => {
  const [isOpenedDropdown, setIsOpenedDropdown] = useState(false)
  const debouncedIsOpenedDropDown = useDebounce(isOpenedDropdown, 100)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const supportedLanguages = useMemo(() => Object.values(Language), [])

  const { i18n } = useTranslation()

  const handleOpenDropdown = useCallback((): void => setIsOpenedDropdown(true), [])
  const handleCloseDropdown = useCallback((): void => setIsOpenedDropdown(false), [])
  const handleChooseLanguage = useCallback(
    (language: Language) => () => {
      void i18n.changeLanguage(language)
      setLanguage(language)
    },
    [i18n],
  )

  useOnClickOutside(dropdownRef, handleCloseDropdown)

  return (
    <div className={styles.container}>
      <button type='button' onClick={debouncedIsOpenedDropDown ? noop : handleOpenDropdown} className={styles.button}>
        <Text textStyle='menuText'>{i18n.language.toUpperCase()}</Text>

        <img
          src='/images/icons/arrow-top.svg'
          alt='dropdown'
          draggable={false}
          className={clsx(styles.arrow, { [styles.arrowOpened]: isOpenedDropdown })}
        />
      </button>

      {isOpenedDropdown && (
        <div className={styles.dropDown} ref={dropdownRef}>
          {supportedLanguages.map((language) => (
            <button
              type='button'
              key={language}
              className={clsx(styles.dropDownItem, { [styles.selectedItem]: i18n.language === language })}
              onClick={handleChooseLanguage(language)}
            >
              <img src={`/images/flags/${language.toLowerCase()}.svg`} alt={language} draggable={false}/>

              <Text textStyle='number'>{language.toUpperCase()}</Text>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
