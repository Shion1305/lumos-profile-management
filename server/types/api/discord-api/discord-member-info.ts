export interface DiscordMemberInfoResponse {
  avatar?: string
  communication_disabled_until?: boolean
  flags: number
  joined_at: string
  nick?: string
  pending?: false
  premium_since?: string
  roles: number[]
  user?: {
    id: string
    username: string
    global_name?: string
    avatar: string
    discriminator: string
    public_flags: number
    avatar_decoration: boolean
  }
  mute: false
  deaf: false
}
