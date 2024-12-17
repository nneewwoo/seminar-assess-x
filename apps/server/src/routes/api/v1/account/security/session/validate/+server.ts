import { json, type RequestHandler } from '@sveltejs/kit'
import * as auth from '$lib/auth'

const POST: RequestHandler = async ({ request }) => {
  const { token } = await request.json()

  const { session } = await auth.validateSessionToken(token)

  if (session) {
    return json({ success: true, body: { valid: session.id !== null } })
  }

  return json({ success: false, body: { error: 'unknown' } })
}

export { POST }
