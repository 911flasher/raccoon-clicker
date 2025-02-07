export interface GuildLeaderResponse {
  user_id: number
  chat_id: number
  username: string
  first_name: string
  points: number
}

export interface GetGuildLeadersResponse {
  success: boolean
  response: {
    list: GuildLeaderResponse[]
  }
}
