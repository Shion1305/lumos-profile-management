import { DiscordMemberInfoResponse } from '~/server/types/api/discord-api/discord-member-info'
import axios from 'axios'

const token = useRuntimeConfig().discord.botToken

async function listGuildMembers(
  id: string
): Promise<DiscordMemberInfoResponse[] | null> {
  const endpoint = `https://discord.com/api/guilds/${id}/members`
  return axios
    .get(endpoint, {
      params: {
        limit: 1000
      },
      headers: {
        Authorization: 'Bot ' + token
      }
    })
    .then((response) => {
      return response.data as DiscordMemberInfoResponse[]
    })
    .catch((error) => {
      console.log(
        'listGuildMembers failed (status, error): ',
        error.response.status,
        error.response.data
      )
      return null
    })
}

export { listGuildMembers }
