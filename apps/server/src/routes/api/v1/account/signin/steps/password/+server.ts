import prisma from '$lib/prisma'
import { json, type RequestHandler } from '@sveltejs/kit'
import { verify } from '@node-rs/argon2'
import * as auth from '$lib/auth'

const POST: RequestHandler = async ({ request }) => {
  const { email, password } = await request.json()

  const user = await prisma.user.findUnique({ where: { email } })

  if (user) {
    const valid = await verify(user.password, password, { algorithm: 2 })
    if (valid) {
      const token = auth.generateSessionToken()
      auth.createSession(token, user.id)
      return json({ success: true, body: { token } })
    } else {
      return json({ success: false, body: { error: 'Invalid password' } })
    }
  } else {
    return json({
      success: false,
      body: {
        error: 'Could not find user'
      }
    })
  }
}

export { POST }
