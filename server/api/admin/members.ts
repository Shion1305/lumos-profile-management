import admin from '~/server/pkg/firebase-admin'
import { User } from '~/server/types/user'
import { UserProfile } from '~/server/types/user_profile'
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
    const targetDiscordMemberData = guildMembersData.find((member) => {
      return member.user?.id == userdataFromDB.discord_service_id
    })
    if (targetDiscordMemberData) {
      exportData.discord_username = targetDiscordMemberData?.user?.username!
      exportData.discord_nickname = targetDiscordMemberData?.nick
      exportData.discord_member_role = targetDiscordMemberData?.roles.some(
        (role) => {
          return role == memberRoleID
        }
      )!
      console.log(targetDiscordMemberData?.avatar)
      exportData.discord_picture_url =
        'https://cdn.discordapp.com/avatars/' +
        targetDiscordMemberData?.user?.id +
        '/' +
        (String(targetDiscordMemberData?.avatar) !== 'null'
          ? targetDiscordMemberData?.avatar
          : targetDiscordMemberData?.user?.avatar)
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
