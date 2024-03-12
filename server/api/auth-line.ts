import { sendError } from 'h3'
import admin from '~/server/pkg/firebase-admin'
import { getAccessToken, getLineUserInfo } from '~/server/pkg/line-auth'
import type { LineTokenResponse } from '~/server/types/api/line-api/line-token'
import type { LineUserProfileResponse } from '~/server/types/api/line-api/line-user'

const db = admin.firestore()

export default defineEventHandler(async (event) => {
  if (!event.context.userID) {
    return sendError(event, new Error('invalid token'))
  }
  const code = getQuery(event).code as string
  if (!code) {
    return sendError(event, new Error('line code not found'))
  }
  const user = await db.collection('users').doc(event.context.userID).get()
  if (!user.exists) {
    return sendError(event, new Error('user not found'))
  }
  const token: LineTokenResponse = await getAccessToken(code)
  const profile: LineUserProfileResponse = await getLineUserInfo(
    token.access_token
  )
  const updateOperation = await db
    .collection('users')
    .doc(event.context.userID)
    .update({
      line_username: profile.displayName,
      line_access_token: token.access_token,
      line_refresh_token: token.refresh_token,
      line_expires_at: Date.now() / 1000 + token.expires_in,
      line_picture_url: profile.pictureUrl
    })
  if (!updateOperation) {
    return sendError(event, new Error('update failed'))
  }
  return {
    status: 200
  }
})
