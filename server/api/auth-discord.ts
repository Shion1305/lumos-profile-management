import admin from '~/server/pkg/firebase-admin'
import { User } from '~/server/types/user'
import {
  getAccessToken,
  getDiscordServerInfo,
  getDiscordUserInfo
} from '~/server/pkg/discord-auth'
import { DiscordUserResponse } from '~/server/types/api/discord-api/discord-user'
import { DiscordAccessTokenResponse } from '~/server/types/api/discord-api/discord-token'
import { generateToken } from '~/server/pkg/jwt'
import cookie from 'cookie'

const db = admin.firestore()

export default defineEventHandler(async (event) => {
  const code: string = getQuery(event).code as string
  const discordTokenResp: DiscordAccessTokenResponse | null =
    await getAccessToken(code)
  if (!discordTokenResp) {
    return sendError(event, new Error('failed to get access token'))
  }
  const discordUser: DiscordUserResponse | null = await getDiscordUserInfo(
    discordTokenResp.access_token
  )
  if (!discordUser) {
    return sendError(
      event,
      new Error('successfully got access token but failed to get user info')
    )
  }
  const serverProfile = await getDiscordServerInfo(
    discordTokenResp.access_token
  )
  if (!serverProfile) {
    // user seems to be not in server...
    return sendRedirect(event, '/error/not_in_server', 302)
  }
  const qResult = await db
    .collection('users')
    .where('discord_service_id', '==', discordUser.id)
    .get()
  var userID: string
  if (qResult.empty || qResult.size == 0) {
    userID = await createUser(discordTokenResp, discordUser, serverProfile.nick)
  } else {
    userID = qResult.docs[0].id
    await updateUser(userID, discordTokenResp, discordUser, serverProfile.nick)
  }
  const token: string = generateToken(userID)
  const serializedCookie = cookie.serialize('authToken', token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/'
  })
  event.res.setHeader('set-cookie', serializedCookie)
  return sendRedirect(event, '/profile', 302)
})

async function updateUser(
  userID: string,
  tokenResp: DiscordAccessTokenResponse,
  userResp: DiscordUserResponse,
  nickname: string | undefined
): Promise<void> {
  await db
    .collection('users')
    .doc(userID)
    .update({
      discord_username: userResp.username + ' #' + userResp.discriminator,
      discord_service_id: userResp.id,
      discord_access_token: tokenResp.access_token,
      discord_refresh_token: tokenResp.refresh_token,
      discord_expires_at: Date.now() / 1000 + tokenResp.expires_in,
      discord_picture_url:
        'https://cdn.discordapp.com/avatars/' +
        userResp.id +
        '/' +
        userResp.avatar +
        '.png',
      discord_nickname: nickname
    })
    .then((docRef) => {
      console.log('Document written with ID: ', userID)
    })
    .catch((error) => {
      console.error('Error adding document: ', error)
    })
}

async function createUser(
  tokenResp: DiscordAccessTokenResponse,
  userResp: DiscordUserResponse,
  nickname: string | undefined
): Promise<string> {
  const newUser: User = {} as User
  newUser.discord_username = userResp.username + ' #' + userResp.discriminator
  newUser.discord_service_id = userResp.id
  newUser.discord_access_token = tokenResp.access_token
  newUser.discord_refresh_token = tokenResp.refresh_token
  newUser.discord_expires_at = Date.now() / 1000 + tokenResp.expires_in
  newUser.discord_picture_url =
    'https://cdn.discordapp.com/avatars/' +
    userResp.id +
    '/' +
    userResp.avatar +
    '.png'
  newUser.discord_nickname = nickname
  newUser.has_access = false
  return await db
    .collection('users')
    .add(newUser)
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id)
      return docRef.id
    })
    .catch((error) => {
      console.error('Error adding document: ', error)
      return ''
    })
}
