import admin from '~/server/pkg/firebase-admin'
import { User } from '~/server/types/user'
import {
  getDiscordServerInfo,
  getDiscordUserInfo,
  refreshDiscordToken
} from '~/server/pkg/discord/api-user'

const db = admin.firestore()

const memberRoleID = Number(useRuntimeConfig().discord.memberRoleID)

export default defineEventHandler(async (event) => {
  const usersFailed = await updateUsers()
  if (usersFailed.length > 0) {
    return {
      status: 500,
      body: {
        message: 'discord token refresh failed for some users',
        errors: usersFailed
      }
    }
  }
  return {
    status: 200
  }
})

async function updateUsers(): Promise<string[]> {
  const usersFailed: string[] = []
  const users = await db.collection('users').get()
  for (const user of users.docs) {
    const userData = user.data() as User
    const newToken = await refreshDiscordToken(userData.discord_refresh_token)
    if (!newToken) {
      usersFailed.push(user.id)
      continue
    }
    const discordProfile = await getDiscordUserInfo(newToken.access_token)
    if (!discordProfile) {
      usersFailed.push(user.id)
      continue
    }
    const updateData = {
      discord_username:
        discordProfile.username + ' #' + discordProfile.discriminator,
      discord_nickname: '',
      discord_service_id: discordProfile.id,
      discord_access_token: newToken.access_token,
      discord_refresh_token: newToken.refresh_token,
      discord_expires_at: Math.floor(Date.now() / 1000) + newToken.expires_in,
      discord_picture_url:
        'https://cdn.discordapp.com/avatars/' +
        discordProfile.id +
        '/' +
        discordProfile.avatar +
        '.png',
      discord_member_role: false
    }

    const discordServerMemberInfo = await getDiscordServerInfo(
      newToken.access_token
    )
    if (discordServerMemberInfo && discordServerMemberInfo.nick) {
      updateData.discord_nickname = discordServerMemberInfo.nick
      updateData.discord_member_role =
        discordServerMemberInfo.roles?.findIndex(
          (value) => value == memberRoleID
        ) > -1
    }

    const refreshReq = await db
      .collection('users')
      .doc(user.id)
      .update(updateData)
    if (!refreshReq) {
      usersFailed.push(user.id)
    }
    console.log('refreshed token for user ' + user.id)
  }
  return usersFailed
}
