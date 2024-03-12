import admin from '~/server/pkg/firebase-admin'
import type { User } from '~/server/types/user'
import type { UserProfile } from '~/server/types/user_profile'
import { listGuildMembers } from '~/server/pkg/discord/api-bot'

const db = admin.firestore()
const targetGuildID = useRuntimeConfig().discord.guildID
const memberRoleID = Number(useRuntimeConfig().discord.memberRoleID)

export default defineEventHandler(async (event) => {
  // access authorization check starts from here
  const userID = event.context.userID
  if (!userID) {
    return sendError(event, new Error('invalid token'))
  }
  const snapshot = await db.collection('users').doc(userID).get()
  if (!snapshot.exists) {
    return sendError(event, new Error('user not found'))
  }
  const userData: User = snapshot.data() as User
  if (!userData.has_access) {
    return sendError(event, new Error('user has no access'))
  }
  // access authorization check ends here

  const guildMembersData = await listGuildMembers(targetGuildID)
  if (!guildMembersData) {
    return sendError(event, new Error('failed to get guild members'))
  }
  const usersSnapshot = await db.collection('users').orderBy('student_id').get()
  const users: UserProfile[] = []
  await usersSnapshot.forEach((doc) => {
    const exportData = {} as UserProfile
    const userdataFromDB = doc.data() as User
    const discordMemberData = guildMembersData.find((member) => {
      return member.user?.id == userdataFromDB.discord_service_id
    })
    if (discordMemberData) {
      exportData.discord_username = discordMemberData.user?.username!
      exportData.discord_global_name = discordMemberData.user?.global_name
      exportData.discord_nickname = discordMemberData.nick
      exportData.discord_member_role = discordMemberData.roles.some((role) => {
        return role == memberRoleID
      })!
      exportData.discord_picture_url =
        'https://cdn.discordapp.com/avatars/' +
        discordMemberData.user?.id +
        '/' +
        (String(discordMemberData.avatar) !== 'null'
          ? discordMemberData.avatar
          : discordMemberData.user?.avatar)
      exportData.discord_on_server = true
    } else {
      exportData.discord_username = userdataFromDB.discord_username
      exportData.discord_nickname = ''
      exportData.discord_member_role = false
      exportData.discord_picture_url = ''
      exportData.discord_on_server = false
    }
    exportData.line_username = userdataFromDB.line_username
    exportData.line_picture_url = userdataFromDB.line_picture_url
    exportData.student_id = userdataFromDB.student_id
    exportData.first_name = userdataFromDB.first_name
    exportData.last_name = userdataFromDB.last_name
    users.push(exportData)
  })
  return users
})
