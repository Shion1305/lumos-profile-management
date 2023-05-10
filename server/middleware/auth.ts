import { verifyToken } from '~/server/jwt'

export default defineEventHandler((event) => {
    const token = getCookie(event, 'authToken')
    if (token) {
        if (token) {
            const auth = verifyToken(token)
            if (auth) {
                event.context.userID = auth.id
            }
        } else {
            console.log('No Bearer Token found')
        }
    } else {
        console.log('No Authorization header')
    }
})
