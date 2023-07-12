export interface UserProfile {
  first_name?: string
  last_name?: string
  student_id?: number
  discord_username?: string
  discord_global_name?: string
  discord_nickname?: string
  discord_picture_url?: string
  discord_member_role?: boolean
  discord_on_server?: boolean
  line_username?: string
  line_picture_url?: string
  has_access?: boolean
}

export function fulfillsRequirements(userProfile: UserProfile): boolean {
  return (
    userProfile.first_name != null &&
    userProfile.last_name != null &&
    userProfile.student_id != null
  )
}
