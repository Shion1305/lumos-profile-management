import { verifyToken } from '~/server/pkg/jwt'

export default defineEventHandler((event) => {
    const token = getCookie(event, 'authToken')
    if (token) {
        const auth = verifyToken(token)
        if (auth) {
            event.context.userID = auth.id
        }
    } else {
        console.log('No Authorization header')
    }
})
