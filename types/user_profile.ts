export interface UserProfile {
  first_name?: string
  last_name?: string
  student_id?: number
  discord_username?: string
  discord_nickname?: string
  discord_picture_url?: string
  line_username?: string
  line_picture_url?: string
  has_access?: boolean
  discord_member_role?: boolean
}

export function fulfillsRequirements(userProfile: UserProfile): boolean {
  return (
    userProfile.first_name != null &&
    userProfile.last_name != null &&
    userProfile.student_id != null
  )
}
