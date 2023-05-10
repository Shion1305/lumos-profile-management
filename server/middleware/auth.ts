import { verifyToken } from '~/server/jwt'

export default defineEventHandler((event) => {
    const authHeader = event.req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1]

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
