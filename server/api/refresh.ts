import admin from "~/server/pkg/firebase-admin";
import {User} from "~/server/types/user";
import {getDiscordUserInfo, refreshDiscordToken} from "~/server/pkg/discord-auth";

const db = admin.firestore()

export default defineEventHandler(async (event) => {
    const errors = []
    const users = await db.collection("users").get()
    for (const user of users.docs) {
        const userData = user.data() as User
        const newToken = await refreshDiscordToken(userData.discord_refresh_token)
        if (!newToken) {
            errors.push(user.id)
            continue
        }
        const discordProfile = await getDiscordUserInfo(newToken.access_token)
        if (!discordProfile) {
            errors.push(user.id)
            continue
        }
        const refreshReq = await db.collection("users").doc(user.id).update({
            discord_username: discordProfile.username + " #" + discordProfile.discriminator,
            discord_service_id: discordProfile.id,
            discord_access_token: newToken.access_token,
            discord_refresh_token: newToken.refresh_token,
            discord_expires_at: (Math.floor(Date.now() / 1000) + newToken.expires_in),
            discord_picture_url: "https://cdn.discordapp.com/avatars/" + discordProfile.id + "/" + discordProfile.avatar + ".png"
        })
        if (!refreshReq) {
            errors.push(user.id)
        }
        console.log("refreshed token for user " + user.id)
    }
    if (errors.length > 0) {
        return {
            status: 500,
            body: {
                message: "discord token refresh failed for some users",
                errors: errors
            }
        }
    }
    return {
        status: 200,
    }
})