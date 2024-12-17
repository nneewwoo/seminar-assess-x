import { error, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import * as auth from '$lib/auth'

const handleAuth: Handle = async ({ event, resolve }) => {
  if (
    !event.url.pathname.startsWith('/api/v1/account/signin') &&
    !event.url.pathname.startsWith('/api/v1/account/signup') &&
    !event.url.pathname.startsWith('/api/v1/account/security')
  ) {
    const sessionToken = event.request.headers
      .get('Authorization')
      ?.split(' ')[1]

    if (!sessionToken) {
      event.locals.user = null
      event.locals.session = null

      throw error(401, 'Unauthorized: Missing token')
    }

    const { session, user } = await auth.validateSessionToken(sessionToken!)
    if (session) {
      event.locals.user = user
      event.locals.session = session
    } else {
      throw error(401, 'Unauthorized: Invalid or expired token')
    }
  }
  return await resolve(event)
}

const allowedOrigins = [
  'http://192.168.254.103:1420',
  'http://192.168.254.105:1420',
  'http://192.168.254.100:1420',
  'http://192.168.254.101:1420',
  'http://192.168.254.183:1420',
  'http://192.168.254.122:1420',
  'http://tauri.localhost',
  'http://192.168.50.128:1420',
  'http://192.168.240.1:1420',
  'https://seminar-asssess.tech'
]

const corsHeaders = {
  'Access-Control-Allow-Origin': '',
  'Access-Control-Max-Age': '3600',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,DELETE',
  'Access-Control-Allow-Headers':
    'Authorization, x-client-info, apikey, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
}

const handleCors: Handle = async ({ event, resolve }) => {
  const origin = event.request.headers.get('Origin')

  if (origin && allowedOrigins.includes(origin)) {
    corsHeaders['Access-Control-Allow-Origin'] = origin
  }

  if (event.request.method !== 'OPTIONS') {
    const response = await resolve(event)
    for (const [key, value] of Object.entries(corsHeaders)) {
      response.headers.set(key, value)
    }
    return response
  }

  return new Response('OK', { headers: corsHeaders, status: 200 })
}

export const handle = sequence(handleCors, handleAuth)
