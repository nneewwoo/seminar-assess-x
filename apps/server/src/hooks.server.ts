import * as auth from '$lib/auth'
import { error, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

const handleAuth: Handle = async ({ event, resolve }) => {
  if (!event.url.pathname.startsWith('/api/v1/account')) {
    const sessionToken = event.request.headers
      .get('Authorization')
      ?.split(' ')[1]
    console.log(event.request.headers)

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
  return resolve(event)
}

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://192.168.254.102:1420',
  'Access-Control-Max-Age': '3600',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,DELETE',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
}

const handleCors: Handle = async ({ event, resolve }) => {
  if (event.request.method !== 'OPTIONS') {
    const response = await resolve(event)
    for (const [key, value] of Object.entries(corsHeaders)) {
      response.headers.set(key, value)
    }
    return response
  }

  return new Response('OK', { headers: corsHeaders, status: 200 })
}

export const handle = sequence(handleAuth, handleCors)
