export interface Friend {
  id: string
  name: string
  profit: string
  avatar?: string
}

export interface FriendResponse {
  success: boolean
  response: {
    list: FriendInfo[]
  }
}

export interface FriendInfo {
  username: string
  first_name: string
  points: number
  points_level_1: number
  points_level_2: number
}
