import {DiscordAccessTokenResponse} from "~/server/types/api/discord-api/discord-token";
import {DiscordUserResponse} from "~/server/types/api/discord-api/discord-user";
import axios from "axios";

async function getAccessToken(
    code: string
): Promise<DiscordAccessTokenResponse | any> {
    const config = useRuntimeConfig()
    const url = 'https://discordapp.com/api/oauth2/token'
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: config.discord.callbackURI,
        client_id: config.discord.clientID,
        client_secret: config.discord.clientSecret
    })
    return axios.post(url, body, {headers: headers}).then((response) => {
        return response.data as DiscordAccessTokenResponse
    })
}

async function getDiscordUserInfo(token: string): Promise<DiscordUserResponse> {
    const url: string = 'https://discordapp.com/api/users/@me'
    const response = await axios.get(url, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    return response.data as DiscordUserResponse
}

export {getAccessToken, getDiscordUserInfo}