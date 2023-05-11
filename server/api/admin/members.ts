import admin from "~/server/firebase-admin";
import {User} from "~/server/types/user";
import {getAccessToken, getDiscordUserInfo} from "~/server/discord-auth";
import {DiscordUserResponse} from "~/server/types/api/discord-api/discord-user";
import {DiscordAccessTokenResponse} from "~/server/types/api/discord-api/discord-token";
import {generateToken} from "~/server/jwt";
import cookie from "cookie";
import {UserProfile} from "~/server/types/user_profile";

const db = admin.firestore();

export default defineEventHandler(async (event) => {
    const userID = event.context.userID
    if (!userID) {
        return sendError(event, new Error("invalid token"))
    }
    const snapshot = await db.collection("users").doc(userID).get()
    if (!snapshot.exists) {
        return sendError(event, new Error("user not found"))
    }
    const userData: User = snapshot.data() as User
    if (!userData.has_access) {
        return sendError(event, new Error("user has no access"))
    }
    const usersSnapshot = await db.collection('users').get()
    const users: UserProfile[] = []
    await usersSnapshot.forEach((doc) => {
        const exportData = {} as UserProfile
        const targetData = doc.data() as User
        exportData.discord_username = targetData.discord_username
        exportData.discord_picture_url = targetData.discord_picture_url
        exportData.line_username = targetData.line_username
        exportData.line_picture_url = targetData.line_picture_url
        exportData.student_id = targetData.student_id
        exportData.first_name = targetData.first_name
        exportData.last_name = targetData.last_name
        users.push(exportData)
    })
    return users
});
