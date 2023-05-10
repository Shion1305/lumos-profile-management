// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    runtimeConfig: {
        line: {
            clientID: process.env.LINE_CLIENT_ID,
            callbackURI: process.env.LINE_CALLBACK_URI,
            clientSecret: process.env.LINE_CLIENT_SECRET
        },
        firebase_admin: {
            certPath: process.env.FIREBASE_ADMIN_CERT_PATH
        },
        jwt: {
            secret: process.env.JWT_SECRET
        },
        discord: {
            clientID: process.env.DISCORD_CLIENT_ID,
            callbackURI: process.env.DISCORD_CALLBACK_URI,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
        }
    }
})
