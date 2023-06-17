import { LineTokenResponse } from '~/server/types/api/line-api/line-token'
import axios from 'axios'
import { LineUserProfileResponse } from '~/server/types/api/line-api/line-user'

async function getAccessToken(code: string): Promise<LineTokenResponse> {
  const config = useRuntimeConfig()
  const url = 'https://api.line.me/oauth2/v2.1/token'
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: config.line.callbackURI,
    client_id: config.line.clientID,
    client_secret: config.line.clientSecret
  })
  // const response = await
  return axios.post(url, body, { headers: headers }).then((response) => {
    return response.data as LineTokenResponse
  })
}

async function getLineUserInfo(
  token: string
): Promise<LineUserProfileResponse> {
  const url: string = 'https://api.line.me/v2/profile'
  const response = await axios.get(url, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return response.data as LineUserProfileResponse
}

export { getAccessToken, getLineUserInfo }
