export interface DiscordMemberInfoResponse {
    avatar?: boolean
    communication_disabled_until?: boolean
    flags: number
    joined_at: string
    nick?: string
    pending?: false
    premium_since?: string
    roles: string[]
    user?: {
        id: string
        username: string
        global_name: boolean,
        display_name: boolean,
        avatar: string
        discriminator: string
        public_flags: number,
        avatar_decoration: boolean
    },
    mute: false,
    deaf: false
}