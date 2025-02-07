export interface Leader {
  id: number
  name: string
  place: number
  points: string
  avatar?: string
}

export interface LeaderData {
  chat_id: number
  points: number
  user_id: number
  username?: string
  first_name?: string
}

export interface LeaderApiResponse {
  success: boolean
  response: {
    list: LeaderData[]
  }
}

export interface StatsApiResponse {
  success: boolean
  response: {
    total_users: number
    total_earned_points: number
    users_today: number
    users_online: number
  }
}

export interface AppStats {
  totalUsers: number
  totalEarnedPoints: number
  usersToday: number
  usersOnline: number
}
