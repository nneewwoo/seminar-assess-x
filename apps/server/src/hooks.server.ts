import { error, type Handle } from '@sveltejs/kit'
import jwt from 'jsonwebtoken'

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.jwt_secret = process.env.JWT_SECRET as string

  // const { pathname } = event.url

  // if (pathname.includes('protected')) {
  //   const token = event.request.headers.get('Authorization')?.split(' ')[1]

  //   console.log(event.request.headers)

  //   if (!token) throw error(401, 'Unauthorized: Missing token')

  //   try {
  //     const decoded = jwt.verify(token, event.locals.jwt_secret) as {
  //       id: string
  //       email: string
  //     }
  //     event.locals.user = decoded
  //   } catch (_error) {
  //     throw error(401, 'Unauthorized: Invalid or expired token')
  //   }
  // }

  if (event.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Max-Age': '3600'
      }
    })
  }

  const response = await resolve(event)
  return response
}
