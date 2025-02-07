// Интерфейсы для входящих данных
interface Locale {
  locale: string
  name: string
  description: string
  button_check: string
  button_link: string
}

export interface TaskInfo {
  id: number
  award: number
  link: string
  type: 'subscribe_telegram'
  extra: string
  is_special: boolean
  locales: Locale[] | null
}

export interface GetTasks {
  success: boolean
  response: {
    list: TaskInfo[]
    completed: number[]
  }
}

interface CheckTaskErrorResponse {
  success: false
  error: {
    code: number
    type: 'task_already_complete' | 'task_not_complete' | string
    message: string
    path: string
  }
}

interface CheckTaskSuccessResponse {
  success: true
}

export type CheckTaskResponse = CheckTaskErrorResponse | CheckTaskSuccessResponse
