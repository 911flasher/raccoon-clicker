import { ReactNode, useEffect, useState, FC } from 'react'

import { createPortal } from 'react-dom'

interface Props {
  children: ReactNode
}

export const Portal: FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return (): void => setMounted(false)
  }, [])

  return mounted ? <>{createPortal(children, document.body)}</> : null
}
