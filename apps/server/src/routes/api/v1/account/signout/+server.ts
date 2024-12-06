import { json, type RequestHandler } from '@sveltejs/kit'
import * as auth from '$lib/auth'

const GET: RequestHandler = async ({ locals }) => {
  if (locals.session) {
    await auth.invalidateSession(locals.session.id)
    return json({ success: true })
  }

  return json({ success: false, body: { error: 'unknown' } })
}

export { GET }
