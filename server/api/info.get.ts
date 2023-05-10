import admin from "~/server/firebase-admin";
import {User} from "~/server/types/user";
import {UserProfile} from "~/server/types/user_profile";

const db = admin.firestore()

export default defineEventHandler(async (event) => {
    const userID = event.context.userID
    if (!userID || userID === "") {
        console.log("user not found", userID)
        return sendError(event, new Error("invalid token"))
    }
    const snapshot = await db.collection("users").doc(userID).get()
    if (!snapshot.exists) {
        return sendError(event, new Error("user not found"))
    }
    const userData: User = snapshot.data() as User
    return {
        discord_username: userData.discord_username,
        discord_picture_url: userData.discord_picture_url,
        line_username: userData.line_username,
        line_picture_url: userData.line_picture_url,
        entry_year: userData.entry_year,
        first_name: userData.first_name,
        last_name: userData.last_name,
    } as UserProfile
})
