// import { retrieveLaunchParams } from '@telegram-apps/sdk'

// import { envConfig } from 'core/env-config'

// const LOCAL_STORAGE_AUTH_DATA_KEY = 'tg-init-data'

export const getAuthKey = (): string => {
  // if (envConfig.isDev) {
  //   const key = localStorage.getItem(LOCAL_STORAGE_AUTH_DATA_KEY)

  //   if (key) return key
  // }

  // const { initDataRaw } = retrieveLaunchParams()

  // if (!initDataRaw) {
  //   throw new Error('Cannot retrieve launch params')
  // }

  // const base64 = btoa(initDataRaw)

  // if (envConfig.isDev) {
  //   localStorage.setItem(LOCAL_STORAGE_AUTH_DATA_KEY, base64)
  // }

  return 'cXVlcnlfaWQ9QUFGNGJPMDJBQUFBQUhoczdUWWxyVTUxJnVzZXI9JTdCJTIyaWQlMjIlM0E5MjE1Mjk0NjQlMkMlMjJmaXJzdF9uYW1lJTIyJTNBJTIySG9kZ2UlMjIlMkMlMjJsYXN0X25hbWUlMjIlM0ElMjIlMjIlMkMlMjJ1c2VybmFtZSUyMiUzQSUyMm1jaG9kZ2UlMjIlMkMlMjJsYW5ndWFnZV9jb2RlJTIyJTNBJTIycnUlMjIlMkMlMjJpc19wcmVtaXVtJTIyJTNBdHJ1ZSUyQyUyMmFsbG93c193cml0ZV90b19wbSUyMiUzQXRydWUlN0QmYXV0aF9kYXRlPTE3MjcxODE0MDImaGFzaD1mNGRmMGM0YTY4NzJlODFkNzM5YmU4NzBkM2UxZDRjOTBlNWM5NmMxODk1MmZjYjM4NmM2N2U1MTVkZDNjMDNj';
}
