import jwt from 'jsonwebtoken'
import { JWTPayload } from 'jose'

const config = useRuntimeConfig()

const SECRET_KEY = config.jwt.secret

const generateToken = (id: string) => {
  return jwt.sign({ id: id }, SECRET_KEY, {
    expiresIn: '1d',
    algorithm: 'HS256'
  })
}

const verifyToken = (token: string): JWTPayload | null => {
  try {
    const id = jwt.verify(token, SECRET_KEY, { algorithms: ['HS256'] })
    console.log('decoded id: ', id)
    if (id) {
      return id as JWTPayload
    }
    return null
  } catch (error) {
    console.log('error: ', error)
    return null
  }
}

export { generateToken, verifyToken }
