import { FC, useCallback, useEffect, useState } from 'react'

import { AxiosError } from 'axios'
import BigNumber from 'bignumber.js'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'core/store/hooks'
import { selectBoostsState } from 'features/boost/store'
import { AppInitLoader, FixedBackground, InitError } from 'features/page-layout'
import { getRaised } from 'features/presale'
import { selectSettingsState } from 'features/settings'
import { initApp as initAppAction } from 'features/settings/store/actions/init-app'
import { initTasksState } from 'features/tasks'

let lock = false

export const MainPage: FC = () => {
  const [isError, setIsError] = useState('')

  const { isAppInitialized, donuts } = useAppSelector(selectSettingsState)
  const { passive } = useAppSelector(selectBoostsState)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const initApp = useCallback(async (): Promise<void> => {
    try {
      await dispatch(initAppAction()).unwrap()

      setIsError('')

      await Promise.allSettled([
        dispatch(initTasksState()).unwrap(),
        dispatch(getRaised()).unwrap(),
      ])
    } catch (e) {
      const err = e as AxiosError
      setIsError(`${err.name}(${err?.code}): ${String(err.response?.data)}`)
    }
  }, [dispatch])

  useEffect(() => {
    if (!lock) {
      lock = true

      void initApp()
    }
  }, [initApp])

  useEffect(() => {
    if (isAppInitialized) {
      if (BigNumber(donuts).lt(1)) {
        navigate('/start')

        return
      }

      if (BigNumber(passive.points).gt(0)) {
        navigate('/offline-earnings')

        return
      }

      navigate('/daily-reward')
    }
  }, [navigate, donuts, passive, isAppInitialized])

  if (isError) {
    return (
      <>
        <InitError />
        <FixedBackground />
      </>
    )
  }

  return <AppInitLoader />
}
