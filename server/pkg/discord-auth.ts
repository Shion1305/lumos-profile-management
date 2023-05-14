import {DiscordAccessTokenResponse} from "~/server/types/api/discord-api/discord-token";
import {DiscordUserResponse} from "~/server/types/api/discord-api/discord-user";
import axios from "axios";
import {DiscordMemberInfoResponse} from "~/server/types/api/discord-api/discord-member-info";

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

async function getDiscordServerInfo(token: string): Promise<DiscordMemberInfoResponse | null> {
    const url: string = `https://discord.com/api/users/@me/guilds/${useRuntimeConfig().discord.guildID}/member`
    return await axios.get(url, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then((response) => {
        if (response.status !== 200) {
            console.log("getDiscordServerInfo failed (status, error): ", response.status, response.data)
            return null
        }
        return response.data as DiscordMemberInfoResponse
    }).catch((error) => {
        console.log("getDiscordServerInfo failed (status, error): ", error.response.status, error.response.data)
        return null
    })
}

async function refreshDiscordToken(refresh_token: string): Promise<DiscordAccessTokenResponse> {
    const config = useRuntimeConfig()
    const url = 'https://discordapp.com/api/oauth2/token'
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const body = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        client_id: config.discord.clientID,
        client_secret: config.discord.clientSecret
    })
    return axios.post(url, body, {headers: headers}).then((response) => {
        return response.data as DiscordAccessTokenResponse
    })
}

export {getAccessToken, getDiscordUserInfo, refreshDiscordToken}