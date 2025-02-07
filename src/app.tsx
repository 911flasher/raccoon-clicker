import { FC, useEffect } from 'react'

import { Toaster } from 'react-hot-toast'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { Portal } from 'core/components/portal'
import { useAppSelector } from 'core/store/hooks'
import { selectClickerState } from 'features/clicker'
import { Layout, FixedBackground } from 'features/page-layout'
import { expandFullScreen } from 'features/tg-api'

export const App: FC = () => {
  const { isInitialized } = useAppSelector(selectClickerState)

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    expandFullScreen()
  }, [])

  useEffect(() => {
    if (pathname !== '/' && !isInitialized) navigate('/')
  }, [pathname, isInitialized, navigate])

  return (
    <>
      <Layout>
        <Outlet />
      </Layout>

      {/* to prevent white screen then overscrolling */}
      <FixedBackground />

      <Portal>
        <Toaster
          containerStyle={{
            zIndex: 99999999,
          }}
          toastOptions={{
            style: {
              border: 'none',
              borderRadius: '16px',
              padding: '12px',
              color: 'var(--text-primary)',
              backgroundColor: '#fff',
              fontFamily: 'Shantell Sans',
              fontSize: 16,
              fontWeight: 400,
              lineHeight: '22px',
            },
            success: {
              style: {
                border: '2px solid var(--accent-additional)',
              },
            },
            error: {
              style: {
                border: '2px solid #ff4b4b',
              },
            },
          }}
        />
      </Portal>
    </>
  )
}
