import prisma from '$lib/prisma'
import { json, type RequestHandler } from '@sveltejs/kit'
import { z } from 'zod'

const POST: RequestHandler = async ({ request }) => {
  const { email } = await request.json()

  try {
    const valid = z
      .object({
        email: z
          .string()
          .email({ message: 'Please enter a valid email address' })
      })
      .parse({ email })

    if (valid) {
      const user = await prisma.user.findUnique({ where: { email } })

      if (user) {
        return json({ success: true, body: { name: user.givenName } })
      } else {
        return json({
          success: false,
          body: {
            error: 'Could not find user with that email'
          }
        })
      }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return json({ success: false, body: { error: error.errors } })
    }
  }
  return json({ success: false, error: 'unknown' })
}

export { POST }
