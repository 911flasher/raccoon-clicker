import axios, { AxiosInstance } from 'axios'

import { envConfig } from 'core/env-config'
import { formatFloatAmount } from 'core/utils/format-balance'
import { Language } from 'features/localization'
import { getAuthKey } from 'features/tg-api'

import { CheckTaskResponse, GetTasks, TaskInfo } from './types'
import { Task, TaskType, LocaleInfo } from '../types'

class TasksClient {
  req: AxiosInstance

  constructor() {
    this.req = axios.create({
      baseURL: envConfig.apiUrl,
      headers: {
        'x-telegram-auth': getAuthKey(),
      },
    })
  }

  async getTasksList(): Promise<Task[]> {
    const { data } = await this.req.get<GetTasks>('/tasks')

    if (!data.success) throw new Error('Cannot get boosts list')

    const sortedList: TaskInfo[] = [...data.response.list]
    sortedList.sort((a, b) => {
      if (b.award === a.award) return b.id - a.id

      return b.award - a.award
    })

    return sortedList.reduce((acc, task) => {
      const translations = this.formatLocales(task)

      if (!translations) return acc

      const formattedTask: Task = {
        id: task.id.toString(),
        price: formatFloatAmount(task.award),
        isHot: task.is_special,
        type: this.detectType(task.link),
        link: task.link,
        localeInfo: translations,
      }

      return [...acc, formattedTask]
    }, [] as Task[])
  }

  async checkTaskStatus(taskId: string): Promise<boolean> {
    const { data } = await this.req.post<CheckTaskResponse>(`/task/${taskId}`)

    if (!data.success) throw new Error('Task is not completed')

    return true
  }

  private detectType(link: string): TaskType {
    if (link.includes('instagram.com')) return TaskType.Instagram

    if (link.includes('t.me') || link === 'invite') return TaskType.Telegram

    if (link.includes('discord')) return TaskType.Discord

    return TaskType.Unknown
  }

  private formatLocales(taskInfo: TaskInfo): Record<Language, LocaleInfo> | null {
    if (taskInfo.locales === null) return null

    return Object.values(Language).reduce(
      (acc, language) => {
        const localeInfo = taskInfo.locales?.find((locale) => locale.locale === language)

        return {
          ...acc,
          [language]: {
            name: localeInfo?.name,
            description: localeInfo?.description,
            buttonCheck: localeInfo?.button_check,
            buttonLink: localeInfo?.button_link,
          },
        }
      },
      {} as Record<Language, LocaleInfo>,
    )
  }
}

export const tasksClient = new TasksClient()
